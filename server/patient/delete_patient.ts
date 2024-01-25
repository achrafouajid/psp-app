"use server";
import { redirect } from "next/navigation";
import prisma from "../../prisma/client";
import getPatient from "./get_patient";
import { revalidatePath } from "next/cache";

export default async function deletePatient(id: string) {
  const patient = await getPatient(id!);
  if (patient == null) return false;
  await prisma.patient.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/");
  redirect("./");
}
