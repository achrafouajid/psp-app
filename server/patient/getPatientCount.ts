import prisma from "../../prisma/client";

export default async function getPatientCount() {
  return await prisma.patient.count();
}
