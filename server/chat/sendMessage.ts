{
  /*"use server";
import currentUser from "../auth/currentUser";
import prisma from "../../prisma/client";

export default async function sendMessage({
  content,
  receiverId,
}: {
  content: string;
  receiverId: string;
}) {
  const user = (await currentUser())!;
  return await prisma.message.create({
    data: {
      senderId: user.id,
      content: content,
      createdAt: new Date(),
      receiverId: receiverId,
    },
  });
}
*/
}
