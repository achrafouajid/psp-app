"use server";
import prisma from "../../prisma/client";
import Hash from "../utils/Hash";
import { revalidatePath } from "next/cache";
import getUser from "./get_user";

type data = {
  Id: string;
  password: string;
  confirmPassword: string;
};
export default async function changePasswordAdmin(data: data) {
  const user = await getUser(data.Id!);
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
