/**
 * Central app configuration.
 * Prefer env vars so values can change without code edits.
 */
function optional(value: string | undefined, fallback: string): string {
  return value?.trim() ? value.trim() : fallback;
}

const isDev = process.env.NODE_ENV === "development";

export const appConfig = {
  name: optional(process.env.NEXT_PUBLIC_APP_NAME, "IMEDIC"),
  tagline: optional(
    process.env.NEXT_PUBLIC_APP_TAGLINE,
    "Healthcare Services"
  ),
  url: optional(
    process.env.NEXT_PUBLIC_APP_URL,
    isDev ? "http://localhost:3000" : "https://med-cryt.vercel.app"
  ),

  email: {
    /** Full Resend "from" value, e.g. `Acme <no-reply@peeng.me>` */
    from: optional(process.env.EMAIL_FROM, "Acme <no-reply@peeng.me>"),
    defaultSubject: optional(
      process.env.EMAIL_DEFAULT_SUBJECT,
      "IMEDIC Notification"
    ),
    apiKey: process.env.RESEND_API_KEY,
  },

  smtp: {
    email: process.env.SMTP_EMAIL,
    password: process.env.SMTP_PASSWORD,
  },

  admin: {
    email: optional(process.env.ADMIN_EMAIL, "admin@imedic.gmail.com"),
    password: optional(process.env.ADMIN_PASSWORD, "AdminSecure@2024"),
    id: optional(process.env.ADMIN_ID, "admin_001"),
  },
};
