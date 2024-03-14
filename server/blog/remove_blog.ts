"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../prisma/client";

export default async function remove_blog(id: string) {
  await prisma.blog.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
}
