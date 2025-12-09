// lib/auth/session.ts
import { cookies } from "next/headers";

export interface SessionData {
  id: string;
  email: string;
  name?: string;
  role?: string;
  userType: "admin" | "staff";
  timestamp: string;
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();

  const adminSession = cookieStore.get("admin_session")?.value;
  const staffSession = cookieStore.get("staff_session")?.value;

  if (!adminSession && !staffSession) {
    return null;
  }

  try {
    let sessionData: SessionData;

    if (adminSession) {
      sessionData = JSON.parse(Buffer.from(adminSession, "base64").toString());
      if (sessionData.userType !== "admin") return null;
    } else {
      sessionData = JSON.parse(Buffer.from(staffSession!, "base64").toString());
      if (sessionData.userType !== "staff") return null;
    }

    // Check expiration
    const sessionTime = new Date(sessionData.timestamp);
    const now = new Date();
    const hoursDiff =
      (now.getTime() - sessionTime.getTime()) / (1000 * 60 * 60);

    if (hoursDiff > 8) {
      return null;
    }

    return sessionData;
  } catch (error) {
    console.error("Session parsing error:", error);
    return null;
  }
}

export async function requireSession(): Promise<SessionData> {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function requireAdminSession(): Promise<SessionData> {
  const session = await requireSession();

  if (session.userType !== "admin") {
    throw new Error("Admin access required");
  }

  return session;
}

export async function requireStaffSession(): Promise<SessionData> {
  const session = await requireSession();

  if (session.userType !== "staff") {
    throw new Error("Staff access required");
  }

  return session;
}
