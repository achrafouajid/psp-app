"use server";

import generateRandomPassword from "@/utils/gernRandPass";
import prisma from "../../prisma/client";
import Hash from "../utils/Hash";
import { registerResponseEnum } from "./types";
import sendMail from "@/app/api/smtp/sendEmail";

type data = {
  email: string;
  firstName: string;
  lastName: string;
  termsAndConditions: Boolean;
};
export default async function register(data: data) {
  const password = generateRandomPassword(8);
  const response = {
    status: registerResponseEnum.exist,
    data: "",
  };
  const user = await prisma.user.findUnique({
    where: {
      email: data.email.toLowerCase(),
    },
  });

  const hash = Hash.make(password);

  if (user == null) {
    await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        passwordHash: hash,
      },
    });
    response.status = registerResponseEnum.success;
    sendMail({
      to: data.email,
      subject: "Rafiki",
      text: "Votre compte a été créé avec succès " + password,
      html: "Votre compte a été créé avec succès " + password,
    });
    return response;
  }
  return response;
}
