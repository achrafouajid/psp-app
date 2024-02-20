"use server";
import { ProgramEnum } from "@prisma/client";
import prisma from "../../prisma/client";
import getPatient from "./get_patient";
import { revalidatePath } from "next/cache";
import upload from "../upload/upload";
type data = {
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
  const firstName = data.get("firstName")?.toString();
  const lastName = data.get("lastName")?.toString();
  const birthDate = data.get("birthDate")?.toString();
  const address = data.get("address")?.toString();
  const notes = data.get("notes")?.toString();
  const isMajor = data.get("isMajor")?.toString() === "on";
  const program = data.get("program")?.toString() as ProgramEnum;
  const id = data.get("id")?.toString();
  const image = data.get("image") as File;

  const patient = await getPatient(id!);
  if (patient == null) return false;

  var imageid = image ? (await upload(image)).id : patient.avatarId;
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
      avatarId: imageid,
      isMajor: isMajor,
    },
  });
  revalidatePath("/");

  return true;
}
