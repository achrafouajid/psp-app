import prisma from "../../../prisma/client";

export default async function getRequest(id: string, patientId: string) {
  const request = await prisma.request.findFirst({
    where: {
      patientId,
      id,
    },
    include: {
      statuses: {
        where: {
          current: true,
          remark: {
            not: null,
          },
        },
      },
      Patient: {
        include: {
          image: true,
        },
      },
      _count: {
        select: {
          documents: true,
        },
      },
    },
  });
  return request;
}
