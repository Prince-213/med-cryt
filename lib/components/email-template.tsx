import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { render } from "@react-email/render";
import { LuStethoscope } from "react-icons/lu";
import { getBaseUrl } from "../utils";

interface MedicalNotificationEmailProps {
  name?: string;
  email?: string;
  message?: string;
}

export const EmailTemplate = ({
  name,
  email,
  message,
}: MedicalNotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>New notification from MediLab {name ? `for ${name}` : ""}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with logo */}
        <Section style={header}>
          <div style={logoContainer}>
            <LuStethoscope size={32} color="#3b82f6" />
            <Text style={logoText}>MediLab</Text>
          </div>
        </Section>

        {/* Main content */}
        <Section style={content}>
          <Text style={greeting}>Hello {name || "there"},</Text>

          <Text style={paragraph}>
            You have a new notification from your MediLab account{" "}
            <strong>{email}</strong>:
          </Text>

          <Section style={messageBox}>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Link href={getBaseUrl()} style={button}>
            Go to Dashboard
          </Link>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>MediLab Healthcare Services</Text>
          <Text style={footerSmallText}>Providing quality care since 2023</Text>
          <Text style={footerLinks}>
            <Link href={`${getBaseUrl()}/contact`} style={link}>
              Contact Us
            </Link>{" "}
            •
            <Link href={`${getBaseUrl()}/privacy`} style={link}>
              Privacy Policy
            </Link>{" "}
            •
            <Link href={`${getBaseUrl()}/terms`} style={link}>
              Terms
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

export const emailHTML = async ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) =>
  await render(<EmailTemplate name={name} email={email} message={message} />);

// Styling
const main = {
  backgroundColor: "#f8fafc",
  color: "#1e293b",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
};

const header = {
  padding: "25px 0",
  textAlign: "center" as const,
  borderBottom: "1px solid #e2e8f0",
};

const logoContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
};

const logoText = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#3b82f6",
  margin: "0",
};

const content = {
  padding: "30px 20px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  margin: "20px 0",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const greeting = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1e293b",
  marginBottom: "20px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#475569",
  margin: "0 0 20px 0",
};

const messageBox = {
  backgroundColor: "#f1f5f9",
  padding: "20px",
  borderRadius: "6px",
  margin: "20px 0",
  borderLeft: "4px solid #3b82f6",
};

const messageText = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#334155",
  margin: "0",
};

const button = {
  display: "inline-block",
  backgroundColor: "#3b82f6",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "500",
  padding: "12px 24px",
  borderRadius: "6px",
  textDecoration: "none",
  margin: "20px 0",
};

const footer = {
  padding: "20px 0",
  textAlign: "center" as const,
  color: "#64748b",
  fontSize: "14px",
  borderTop: "1px solid #e2e8f0",
};

const footerText = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#3b82f6",
  margin: "0 0 8px 0",
};

const footerSmallText = {
  fontSize: "12px",
  margin: "0 0 12px 0",
};

const footerLinks = {
  fontSize: "12px",
  color: "#94a3b8",
};

const link = {
  color: "#64748b",
  textDecoration: "none",
  margin: "0 5px",
};
