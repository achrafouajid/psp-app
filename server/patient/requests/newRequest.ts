"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../../prisma/client";
import getPatient from "../get_patient";
import { redirect } from "next/navigation";
import { RequestStatusEnum } from "@prisma/client";

export default async function newRequest(data: FormData) {
  const patientId = data.get("patientId")?.toString();
  const date = data.get("createdAt")?.toString();
  const remark = data.get("remark")?.toString();

  const patient = await getPatient(patientId!);
  if (patient == null) return false;
  await prisma.request.create({
    data: {
      patientId: patientId!,
      createdAt: new Date(date!),
      statuses: {
        create: {
          createdAt: new Date(),
          current: true,
          status: RequestStatusEnum.Cree,
          remark: remark,
        },
      },
    },
  });
  revalidatePath("/");
}
