"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../prisma/client";

export default async function remove_category(id: string) {
  await prisma.category.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
}
