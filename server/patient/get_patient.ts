import { UserRole } from "@prisma/client";
import prisma from "../../prisma/client";

export default async function getPatient(id: string) {
  return await prisma.patient.findFirst({
    where: {
      id: id,
    },
    include: {
      image: true,
      doctor: true,
      caregiver: true,
    },
  });
}
