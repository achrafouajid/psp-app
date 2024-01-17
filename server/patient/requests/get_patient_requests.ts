import { notFound } from "next/navigation";
import prisma from "../../../prisma/client";

export default async function getPatientRequests(id: string) {
  const patient = await prisma.patient.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      requests: {
        include: {
          _count: {
            select: {
              documents: true,
            },
          },
        },
      },
    },
  });

  if (!patient) {
    notFound();
  }

  return patient;
}
