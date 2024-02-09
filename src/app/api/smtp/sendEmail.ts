import nodemailer from "nodemailer";
export default async function sendMail(props: {
  to: string;
  subject: string;
  text: string;
}) {
  const transporter = nodemailer.createTransport({
    port: 587,
    secure: false,
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Setup email data

  await transporter
    .sendMail({
      from: process.env.SMTP_EMAIL,
      ...props,
    })
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((err) => {
      console.log(err);
    });
}
