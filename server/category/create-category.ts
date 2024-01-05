"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../prisma/client";
import { CategoryEnum } from "./types";

export default async function create_category(
  label: string,
  color: string
): Promise<CategoryEnum> {
  const exist = await prisma.category.findFirst({
    where: {
      label: {
        equals: label.trim(),
      },
    },
  });
  if (exist) return CategoryEnum.Exist;
  const category = await prisma.category.create({
    data: {
      color,
      label,
    },
  });
  revalidatePath("/");
  return CategoryEnum.Success;
}
