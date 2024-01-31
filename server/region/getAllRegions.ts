"use server";
import prisma from "../../prisma/client";

export default async function getAllRegions() {
  return await prisma.region.findMany({
    include: {
      city: {
        select: {
          id: true,
          name: true,
          doctors: {
            select: {
              _count: {
                select: {
                  Patient: true,
                },
              },
            },
          },
        },
      },
    },
  });
}
