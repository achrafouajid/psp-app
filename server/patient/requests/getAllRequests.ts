"use server";
import prisma from "../../../prisma/client";

export default async function getAllRequests() {
  const request = await prisma.request.findMany({
    include: {
      statuses: {
        where: {
          current: true,
        },
      },
      Patient: true,
      _count: {
        select: {
          documents: true,
        },
      },
    },
  });
  return request;
}
