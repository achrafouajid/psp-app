"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../../prisma/client";
import getPatient from "../get_patient";
import { redirect } from "next/navigation";
import { RequestStatusEnum } from "@prisma/client";
import newRequestStatus from "./newRequestStatus";
import upload from "../../upload/upload";

export default async function CompRequest(data: FormData) {
  const id = data.get("id")?.toString();
  const patientId = data.get("patientId")?.toString();
  const date = data.get("createdAt")?.toString();
  const remark = data.get("remark")?.toString();
  const patient = await getPatient(patientId!);
  const document = data.getAll("documents") as File[];
  if (patient == null) return false;
  var documents = await Promise.all(document.map(async (i) => await upload(i)));

  await prisma.request.update({
    where: {
      id,
    },
    data: {
      patientId: patientId!,
      createdAt: new Date(date!),
    },
  });
  await newRequestStatus(id!, RequestStatusEnum.Complete, remark, documents);
  revalidatePath("/");
  redirect("./");
}
