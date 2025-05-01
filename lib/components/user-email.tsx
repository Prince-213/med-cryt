
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  render,
} from "@react-email/components";
import * as React from "react";
import { LuStethoscope } from "react-icons/lu";

interface SlackConfirmEmailProps {
  name?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://techorbit.vercel.app`
  : "https://techorbit.vercel.app";

export const SlackConfirmEmail = ({ name }: SlackConfirmEmailProps) => (
  <Html>
    <Head />
    <Preview>You have a new notification from Medical Lab</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <div className=" text-4xl text-blue-500 flex items-center space-x-2">
            <LuStethoscope size={50} />
            <h1>MediLab</h1>
          </div>
        </Section>
        <Heading style={h1}>Thank you for reaching out to us.</Heading>
        <Text style={heroText}>Hi {name}</Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}>
            Thank you for taking the time to contact us at TechOrbit! We’ve
            received your message and are excited to connect with you. Whether
            you have a question, feedback, or just want to talk tech, {"we're"}{" "}
            here to help and will get back to you as soon as possible.
          </Text>
        </Section>

        <Text style={text}>
          In the meantime, feel free to explore more of our tutorials, articles,
          and programming resources. We’re always adding new content to keep you
          up-to-date with the latest in tech.
        </Text>

        <Section>
          <Row style={footerLogos}>
            <Column style={{ width: "66%" }}>
              <Img
                src={`${baseUrl}/lgoo.png`}
                width="60"
                height="60"
                alt="Slack"
              />
            </Column>
            <Column>
              <Section>
                <Row>
                  <Column>
                    <Link href="https://x.com/teqorbit">
                      <Img
                        src={`${baseUrl}/icons8-twitterx-100.png`}
                        width="32"
                        height="32"
                        alt="Slack"
                        style={socialMediaIcon}
                      />
                    </Link>
                  </Column>
                  <Column>
                    <Link href="/">
                      <Img
                        src={`${baseUrl}/icons8-instagram-96.png`}
                        width="32"
                        height="32"
                        alt="Slack"
                        style={socialMediaIcon}
                      />
                    </Link>
                  </Column>
                  <Column>
                    <Link href="`https://www.facebook.com/profile.php?id=61568429153481`">
                      <Img
                        src={`${baseUrl}/icons8-facebook-96.png`}
                        width="32"
                        height="32"
                        alt="Slack"
                        style={socialMediaIcon}
                      />
                    </Link>
                  </Column>
                </Row>
              </Section>
            </Column>
          </Row>
        </Section>

        <Section>
          <Link
            style={footerLink}
            href={`${baseUrl}/blog`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Our blog
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href={`${baseUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Home
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href={`${baseUrl}/about`}
            target="_blank"
            rel="noopener noreferrer"
          >
            About Us
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href={`${baseUrl}/contact`}
            target="_blank"
            rel="noopener noreferrer"
            data-auth="NotApplicable"
            data-linkindex="6"
          >
            Contact Us
          </Link>
          <Text style={footerText}>
            ©2022 TechOrbit Technologies, LLC, a Salesforce company. <br />
            <br />
            All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default SlackConfirmEmail;

export const userEmailHTML = async ({ name }: { name: string }) =>
  await render(<SlackConfirmEmail name={name} />);

const footerText = {
  fontSize: "12px",
  color: "#b7b7b7",
  lineHeight: "15px",
  textAlign: "left" as const,
  marginBottom: "50px",
};

const footerLink = {
  color: "#b7b7b7",
  textDecoration: "underline",
};

const footerLogos = {
  marginBottom: "32px",
  paddingLeft: "8px",
  paddingRight: "8px",
  width: "100%",
};

const socialMediaIcon = {
  display: "inline",
  marginLeft: "32px",
};

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "0px 20px",
};

const logoContainer = {
  marginTop: "32px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "30px",
};

const codeBox = {
  background: "rgb(245, 244, 245)",
  borderRadius: "4px",
  marginBottom: "30px",
  padding: "40px 10px",
};

const confirmationCodeText = {
  fontSize: "14px",
  lineHeight: "1.5rem",
  textAlign: "left" as const,
  verticalAlign: "middle",
};

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};
