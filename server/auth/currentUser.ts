"use server";
import { cookies } from "next/headers";
import prisma from "../../prisma/client";
import * as jose from "jose";
import { JwtPayload } from "./types";

export default async function currentUser() {
  const authToken = cookies().get("authToken")!.value;
  const jwtoken = jose.decodeJwt<JwtPayload>(authToken);

  var user = await prisma.user.findUnique({
    where: {
      id: jwtoken.userId,
    },
  });
  return user;
}
