"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../../prisma/client";
import getPatient from "../get_patient";
import { redirect } from "next/navigation";
import { RequestStatusEnum } from "@prisma/client";
import newRequestStatus from "./newRequestStatus";

export default async function AcceptRequest(data: FormData) {
  const id = data.get("id")?.toString();
  const patientId = data.get("patientId")?.toString();

  const patient = await getPatient(patientId!);
  if (patient == null) return false;

  await prisma.request.update({
    where: {
      id,
    },
    data: {
      patientId: patientId!,
    },
  });
  await newRequestStatus(id!, RequestStatusEnum.Accepte);
  revalidatePath("/");
}
