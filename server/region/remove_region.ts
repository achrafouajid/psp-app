"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../prisma/client";

export default async function remove_region(id: string) {
  await prisma.region.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
}
