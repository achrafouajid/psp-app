"use server";
import prisma from "../../prisma/client";
import Hash from "../utils/Hash";
import { redirect } from "next/navigation";

export default async function changePass(
  email: string,
  otp: string,
  pass: string
) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
      otp: otp,
    },
  });
  if (user) {
    const password = Hash.make(pass);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash: password,
      },
    });
    redirect("/login");
  }
  return false;
}
