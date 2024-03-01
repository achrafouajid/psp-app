"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../prisma/client";

export default async function removeAppointment(id: string) {
  await prisma.appointment.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
}
