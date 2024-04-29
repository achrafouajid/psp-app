import prisma from "../../prisma/client";

export default async function getEmail(id: string, userId: string) {
  const email = await prisma.mail.findFirst({
    where: {
      senderId: userId,
      id,
    },
    include: {
      receiver: true,
      sender: true,
    },
  });
  return email;
}
