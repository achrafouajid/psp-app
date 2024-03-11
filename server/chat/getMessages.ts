{
  /*"use server";
import currentUser from "../auth/currentUser";
import prisma from "../../prisma/client";

export default async function getMessages(receiverId: string) {
  const user = await currentUser();
  return await prisma.message.findMany({
    where: {
      OR: [
        {
          AND: [{ senderId: user?.id }, { receiverId: receiverId }],
        },
        {
          AND: [{ senderId: receiverId }, { receiverId: user?.id }],
        },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
*/
}
