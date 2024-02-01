"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../prisma/client";

export default async function remove_city(id: string) {
  await prisma.city.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
}
