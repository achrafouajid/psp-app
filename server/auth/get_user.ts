import prisma from "../../prisma/client";

export default async function getUser(id: string) {
  return await prisma.user.findFirst({
    where: {
      id: id,
    },
    include: {
      avatar: true,
    },
  });
}
