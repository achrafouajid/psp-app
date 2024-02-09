{
  /*"use strict";
const nodemailer = require("nodemailer");
export default async function handler(req, res) {
  const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME, // Store your credentials in environment variables
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to: "bar@example.com, baz@example.com",
      subject: "Hello  ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    res
      .status(200)
      .json({ message: "Email sent successfully", messageId: info.messageId });
  } catch (error) {
    res.status(500).json({ error: "Error sending email" });
  }
}
*/
}
