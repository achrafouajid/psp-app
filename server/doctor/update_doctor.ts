"use server";
import { ProgramEnum } from "@prisma/client";
import prisma from "../../prisma/client";
import { revalidatePath } from "next/cache";
import upload from "../upload/upload";
import getDoctor from "./get_doctor";
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
export default async function updatePatient(data: FormData) {
  const email = data.get("email")?.toString();
  const firstName = data.get("firstName")?.toString();
  const lastName = data.get("lastName")?.toString();
  const birthDate = data.get("birthDate")?.toString();
  const address = data.get("address")?.toString();
  const notes = data.get("notes")?.toString();
  const isMajor = data.get("isMajor")?.toString() === "on";
  const program = data.get("program")?.toString() as ProgramEnum;
  const id = data.get("id")?.toString();
  const image = data.get("image") as File;

  const patient = await getDoctor(id!);
  if (patient == null) return false;

  await prisma.patient.update({
    where: {
      id: id,
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      program: program,
      address: address,
      birthDate: new Date(birthDate!),
      notes: notes,
      isMajor: isMajor,
    },
  });
  revalidatePath("/");

  return true;
}
