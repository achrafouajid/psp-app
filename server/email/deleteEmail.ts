"use server";
import prisma from "../../prisma/client";

export async function deleteSentEmail(emailId: string, userId: string) {
  // Check if the user is the sender of the email
  const email = await prisma.mail.findUnique({
    where: {
      id: emailId,
    },
    select: {
      senderId: true, // Assuming 'senderId' is the field that stores the sender's ID
    },
  });

  if (!email) {
    throw new Error("Email not found");
  }

  if (email.senderId !== userId) {
    throw new Error("You are not the sender of this email");
  }

  // Delete the mail record if the user is the sender
  const deletedMail = await prisma.mail.delete({
    where: {
      id: emailId,
    },
  });

  console.log("Sent email deleted successfully:", deletedMail);
}
