/* eslint-disable @typescript-eslint/no-explicit-any */

import { Resend } from "resend";
import EmailTemplate from "../../../lib/components/email-template";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const traceId = crypto.randomUUID();
  const startedAt = Date.now();
  let body;

  const safeLog = (
    level: "log" | "error" | "warn",
    event: string,
    details?: Record<string, unknown>
  ) => {
    console[level](`[email-api][${traceId}] ${event}`, details ?? {});
  };

  try {
    const contentType = request.headers.get("content-type") ?? "";

    safeLog("log", "request_received", {
      method: request.method,
      url: request.nextUrl.pathname,
      contentType,
      hasResendApiKey: Boolean(process.env.RESEND_API_KEY),
    });

    // Accept application/json with optional charset
    if (!contentType.toLowerCase().includes("application/json")) {
      safeLog("warn", "invalid_content_type", { contentType });
      return NextResponse.json(
        {
          error: "Invalid Content-Type. Expected application/json",
          traceId,
        },
        { status: 400 }
      );
    }

    body = await request.json();

    safeLog("log", "payload_parsed", {
      hasName: Boolean(body?.name),
      hasEmail: Boolean(body?.email),
      hasMessage: Boolean(body?.message),
      subjectProvided: Boolean(body?.subject),
      recipientDomain:
        typeof body?.email === "string" && body.email.includes("@")
          ? body.email.split("@")[1]
          : null,
      messageLength:
        typeof body?.message === "string" ? body.message.length : null,
    });

    if (!body?.email || !body?.name || !body?.message) {
      safeLog("warn", "missing_required_fields", {
        hasName: Boolean(body?.name),
        hasEmail: Boolean(body?.email),
        hasMessage: Boolean(body?.message),
      });
      return NextResponse.json(
        {
          error: "Missing required fields: email, name, or message",
          traceId,
        },
        { status: 400 }
      );
    }

    safeLog("log", "sending_email_start");

    const { data, error } = await resend.emails.send({
      from: "Acme <no-reply@peeng.me>",
      to: [body.email],
      subject: body.subject || "WorkSafe-Pass Notification",
      react: EmailTemplate({
        name: body.name,
        email: body.email,
        message: body.message,
      }) as React.ReactElement,
    });

    if (error) {
      safeLog("error", "resend_send_failed", {
        resendErrorName: error.name,
        resendErrorMessage: error.message,
        resendError: error,
      });
      return NextResponse.json({ error, traceId }, { status: 500 });
    }

    safeLog("log", "email_sent_success", {
      resendId: data?.id,
      durationMs: Date.now() - startedAt,
    });

    return NextResponse.json({ data, traceId }, { status: 200 });
  } catch (error: any) {
    safeLog("error", "request_processing_error", {
      errorName: error?.name,
      errorMessage: error?.message,
      stack: error?.stack,
      durationMs: Date.now() - startedAt,
    });

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON format", traceId },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error", traceId },
      { status: 500 }
    );
  }
}

export const config = {
  runtime: "nodejs",
};
