import prisma from "../../prisma/client";

export default async function getDoctor(id: string) {
  return await prisma.doctor.findFirst({
    where: {
      id: id,
    },
    include: {
      _count: {
        select: {
          Patient: true,
        },
      },
      city: {
        include: {
          region: true,
        },
      },
    },
  });
}
