"use server";
import prisma from "../../prisma/client";
import Hash from "../utils/Hash";
import currentUser from "./currentUser";
import { revalidatePath } from "next/cache";

type data = {
  password: string;
  confirmPassword: string;
};
export default async function changePassword(data: data) {
  const user = await currentUser();
  if (user == null) return false;
  if (user) {
    const password = Hash.make(data.password);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash: password,
      },
    });
    revalidatePath("/");

    return true;
  }
  return false;
}
