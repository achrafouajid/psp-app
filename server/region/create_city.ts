"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../prisma/client";
import { CategoryEnum } from "../category/types";

export default async function createCity(
  name: string,
  id: string
): Promise<CategoryEnum> {
  const exist = await prisma.city.findFirst({
    where: {
      name: {
        equals: name.trim(),
      },
    },
  });
  if (exist) return CategoryEnum.Exist;
  const city = await prisma.city.create({
    data: {
      name,
      region: {
        connect: {
          id: id,
        },
      },
    },
  });
  revalidatePath("/");
  return CategoryEnum.Success;
}
