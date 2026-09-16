import nodemailer from "nodemailer";
import { appConfig } from "../config";

export async function sendMail({
  to,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const smtpEmail = appConfig.smtp.email;
  const smtpPassword = appConfig.smtp.password;

  if (!smtpEmail || !smtpPassword) {
    console.error("[sendMail] missing SMTP_EMAIL or SMTP_PASSWORD in env");
    return;
  }

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpEmail,
      pass: smtpPassword,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log("[sendMail] smtp_verify_ok", testResult);
  } catch (error) {
    console.error("[sendMail] smtp_verify_failed", { error });
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: smtpEmail,
      to,
      subject,
      html: body,
    });
    console.log("[sendMail] smtp_send_ok", {
      messageId: sendResult.messageId,
      accepted: sendResult.accepted,
      rejected: sendResult.rejected,
    });
  } catch (error) {
    console.error("[sendMail] smtp_send_failed", error);
  }
}
