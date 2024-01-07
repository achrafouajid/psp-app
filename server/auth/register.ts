"use server";

import prisma from "../../prisma/client";
import Hash from "../utils/Hash";
import { registerResponseEnum } from "./types";

type data = {
  email: string;
  password: string;
  name: string;
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
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: Hash.make(data.password),
      },
    });
    response.status = registerResponseEnum.success;
    return response;
  }
  return response;
}
