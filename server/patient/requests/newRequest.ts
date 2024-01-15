"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../../prisma/client";
import getPatient from "../get_patient";
import upload from "../../upload/upload";

export default async function newRequest(data: FormData) {
  const patientId = data.get("patientId")?.toString();
  const date = data.get("createdAt")?.toString();
  const remark = data.get("remark")?.toString();
  const document = data.getAll("documents") as File[];

  const patient = await getPatient(patientId!);
  if (patient == null) return false;
  var documents = await Promise.all(
    document.map(async (i) => (await upload(i)).id)
  );
  await prisma.request.create({
    data: {
      patientId: patientId!,
      createdAt: new Date(date!),
      remark: remark,
      documents: {
        create: documents.map((i) => ({
          documentId: i,
        })),
      },
    },
  });
  revalidatePath("/");

  return true;
}
