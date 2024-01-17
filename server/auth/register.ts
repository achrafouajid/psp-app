"use server";

import prisma from "../../prisma/client";
import Hash from "../utils/Hash";
import { registerResponseEnum } from "./types";

type data = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  termsAndConditions: Boolean;
};
export default async function register(data: data) {
  const response = {
    status: registerResponseEnum.exist,
    data: "",
  };
  const user = await prisma.user.findUnique({
    where: {
      email: data.email.toLowerCase(),
    },
  });

  const password = Hash.make(data.password);

  if (user == null) {
    await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        passwordHash: password,
      },
    });
    response.status = registerResponseEnum.success;
    return response;
  }
  return response;
}
