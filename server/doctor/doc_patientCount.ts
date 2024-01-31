"use server";

import prisma from "../../prisma/client";

export default async function getDocPatientCount() {
  return await prisma.doctor.count();
}
