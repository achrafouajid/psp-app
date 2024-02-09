import { UserRole } from "@prisma/client";
import prisma from "../../prisma/client";

export default async function getAllPatients() {
  return await prisma.patient.findMany({
    include: {
      image: true,
      doctor: true,
      requests: true,
    },
  });
}
