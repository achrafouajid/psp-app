{
  /*"use server";
import { ProgramEnum } from "@prisma/client";
import prisma from "../../prisma/client";
import { registerResponseEnum } from "../auth/types";
import { revalidatePath } from "next/cache";

type data = {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  notes?: string;
  doctor?: string;
  program: ProgramEnum;
};

export default async function addPatientFast(data: data) {
  const response = {
    status: registerResponseEnum.exist,
    data: "",
  };

  await prisma.patient.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: new Date(data.birthDate),
      address: data.address,
      program: ProgramEnum.PSP,
      notes: data.notes,
      doctor: {
        connect: {
          id: data.doctor,
        },
      },
    },
  });

  response.status = registerResponseEnum.success;
  revalidatePath("/");

  return response;
}
*/
}
