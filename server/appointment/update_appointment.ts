"use server";
import prisma from "../../prisma/client";
import { revalidatePath } from "next/cache";

export default async function updateAppointment(id: string) {
  const appointment = await prisma.appointment.findFirst({
    where: {
      id: id,
    },
  });
  if (appointment == null) return false;

  await prisma.appointment.update({
    where: {
      id: id,
    },
    data: {},
  });
  revalidatePath("/");

  return true;
}
