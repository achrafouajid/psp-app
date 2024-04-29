"use server";
import prisma from "../../prisma/client";

export async function getAllEmailAddresses() {
  return prisma.user.findMany({
    select: {
      firstName: true,
      lastName: true,
      email: true,
    },
  });
}

export async function getAllEmails() {
  // Fetch all emails, including sender and receiver details
  const emails = await prisma.mail.findMany({
    include: {
      sender: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      receiver: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
    orderBy: {
      sentDate: "desc",
    },
  });

  return emails;
}
