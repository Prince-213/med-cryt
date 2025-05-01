import { emailHTML } from "@/lib/components/email-template";
import { sendMail } from "@/lib/components/mail";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  console.log(name, email, message);

  try {
    /* const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "princolosh@gmail.com",
      subject: "New Reach Out from TechOrbit",
      react: EmailTemplate({ name, email, message }) as React.ReactElement
    }); */

    const htmlMail = await emailHTML({
      name: name,
      email: email,
      message: message
    });

    /*  const userHtml = await userEmailHTML({
      name: name
    }); */

    //Send mail to admin
    await sendMail({
      to: `${email}`,
      name: name,
      subject: "IMEDIC Notification",
      body: htmlMail
    });

    //Sen user mail

    /*    await sendMail({
      to: email,
      name: "Medical Lab",
      subject: "Medical Lab Notification",
      body: userHtml
    }); */

    return Response.json({ data: "yo there" });
  } catch (error) {
    return Response.json({ data: `${error}` }, { status: 500 });
  }
}
