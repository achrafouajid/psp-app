"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "../../../prisma/client";
import getPatient from "../get_patient";

export default async function deleteRequest(id: string) {
  await prisma.request.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
  redirect("./");
}
