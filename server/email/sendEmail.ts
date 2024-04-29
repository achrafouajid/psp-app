"use server";

import prisma from "../../prisma/client";

async function sendEmail(
  senderId: string,
  subject: string,
  email: string,
  body: string
) {
  // Find the recipient's user ID based on their email
  const recipient = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!recipient) {
    throw new Error("Recipient not found");
  }

  // Create a new Mail record
  const newMail = await prisma.mail.create({
    data: {
      senderId: senderId,
      receiverId: recipient.id,
      subject: subject,
      body: body,
      sentDate: new Date(),
      attachmentId: "",
    },
  });

  console.log("Email sent successfully:", newMail);
}

// Example usage
sendEmail(
  "senderUserId",
  "Hello",
  "example@example.com",
  "This is a test email."
)
  .then(() => console.log("Email sent"))
  .catch((error) => console.error("Error sending email:", error));
