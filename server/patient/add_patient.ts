"use server";
import { Prisma, ProgramEnum, UserStatus } from "@prisma/client";
import prisma from "../../prisma/client";
import Hash from "../utils/Hash";
import { registerResponseEnum } from "../auth/types";
import { revalidatePath } from "next/cache";

type data = {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  notes?: string;
  program: ProgramEnum;
};

export default async function addPatient(data: data) {
  const response = {
    status: registerResponseEnum.exist,
    data: "",
  };

  await prisma.patient.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      program: data.program,
      address: data.address,
      birthDate: new Date(data.birthDate),
      notes: data.notes,
    },
  });
  response.status = registerResponseEnum.success;
  revalidatePath("/");

  return response;
}
