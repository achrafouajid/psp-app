"use server";
import { ProgramEnum } from "@prisma/client";
import prisma from "../../prisma/client";
import getPatient from "./get_patient";
import { revalidatePath } from "next/cache";
type data = {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  notes?: string;
  program: ProgramEnum;
  id: string;
  image: File;
};
export default async function deletePatient(data: FormData) {
  const id = data.get("id")?.toString();
  const patient = await getPatient(id!);
  if (patient == null) return false;
  await prisma.patient.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
  return true;
}
