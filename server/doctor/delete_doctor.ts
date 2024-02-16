"use server";
import { redirect } from "next/navigation";
import prisma from "../../prisma/client";
import { revalidatePath } from "next/cache";
import getDoctor from "./get_doctor";

export default async function deleteDoctor(id: string) {
  const patient = await getDoctor(id!);
  if (patient == null) return false;
  await prisma.doctor.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/");
  redirect("./");
}
