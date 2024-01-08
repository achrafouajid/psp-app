{
  /*"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../prisma/client";
import { Program } from "@prisma/client";
import { CategoryEnum } from "../category/types";
import currentUser from "../auth/currentUser";

export default async function create_patient(
  firstname: string,
  lastname: string,
  birthDate: Date,
  program: Program,
  address: string,
  note: string
) {
  const auth = await currentUser();
  const patient = await prisma.patient.create({
    data: {
      doctorId: auth!.id,
      firstname,
      lastname,
      birthDate,
      program,
      address,
      note,
    },
  });
  revalidatePath("/");
}
*/
}
