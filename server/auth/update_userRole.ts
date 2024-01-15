"use server";
import prisma from "../../prisma/client";
import { revalidatePath } from "next/cache";
import getUser from "./get_user";
import { UserRole } from "@prisma/client";

export default async function updateUserRole(id: string, role: UserRole) {
  if (!id) {
    console.error("ID is undefined");
    return false;
  }

  const user = await getUser(id);
  if (user == null) return false;

  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      role: role,
    },
  });
  revalidatePath("/");

  return true;
}
