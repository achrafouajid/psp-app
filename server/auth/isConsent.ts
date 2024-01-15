"use server";
import prisma from "../../prisma/client";
import getUser from "./get_user";

export default async function isConsent(id: string) {
  const user = await getUser(id!);
  if (user == null) return false;
  await prisma.user.update({
    where: { id: id },
    data: { isConsent: true },
  });
}
