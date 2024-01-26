"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../prisma/client";
import { CategoryEnum } from "../category/types";

export default async function createRegion(
  name: string
): Promise<CategoryEnum> {
  const exist = await prisma.region.findFirst({
    where: {
      name: {
        equals: name.trim(),
      },
    },
  });
  if (exist) return CategoryEnum.Exist;
  const region = await prisma.region.create({
    data: {
      name,
    },
  });
  revalidatePath("/");
  return CategoryEnum.Success;
}
