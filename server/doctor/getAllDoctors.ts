"use server";
import prisma from "../../prisma/client";

export default async function getAllDoctors() {
  return await prisma.doctor.findMany({
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
