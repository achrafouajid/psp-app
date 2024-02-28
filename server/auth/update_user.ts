"use server";
import prisma from "../../prisma/client";
import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";
import upload from "../upload/upload";
import currentUser from "./currentUser";

export default async function updateUser(data: FormData) {
  const firstName = data.get("firstName")?.toString();
  const lastName = data.get("lastName")?.toString();
  const birthDate = data.get("birthDate")?.toString();
  const email = data.get("email")?.toString();
  const role = data.get("role")?.toString() as UserRole;
  const image = data.get("image") as File;
  const user = await currentUser();
  if (user == null) return false;
  var imageid = image ? (await upload(image)).id : user.avatarId;
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      birthDate: new Date(birthDate!),
      email: email,
      avatarId: imageid,
      role: role,
    },
  });
  revalidatePath("/");

  return true;
}
