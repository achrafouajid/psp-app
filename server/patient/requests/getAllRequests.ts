"use server";
import prisma from "../../../prisma/client";

export default async function getAllRequests() {
  const request = await prisma.request.findMany({
    include: {
      statuses: {
        include: {
          _count: {
            select: {
              documents: true,
            },
          },
        },
      },
      Patient: true,
    },
  });
  return request;
}
