import prisma from "../../../prisma/client";

export default async function getRequest(id: string, patientId: string) {
  const request = await prisma.request.findFirst({
    where: {
      patientId,
      id,
    },
    include: {
      statuses: {
        include: {
          documents: {
            include: {
              document: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      Patient: {
        include: {
          image: true,
        },
      },
    },
  });
  return request;
}
