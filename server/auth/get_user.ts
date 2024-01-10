import prisma from "../../prisma/client";

export default async function getUser(id: string) {
  return await prisma.patient.findFirst({
    where: {
      id: id,
    },
    include: {
      image: true,
    },
  });
}
