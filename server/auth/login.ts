"use server";
import prisma from "../../prisma/client";
import Hash from "../utils/Hash";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as jose from "jose";
import { User, UserRole } from "@prisma/client";
import jwtDecoded from "./jwtDecoded";
import { af_ZA } from "@faker-js/faker";

export default async function login(username: string, password: string) {
  var user = await prisma.user.findFirst({
    where: {
      email: username,
    },
  });
  if (user == null) {
    return false;
  }

  const isAuth = Hash.verify(password, user.passwordHash);
  if (isAuth) {
    const jwt = await makeJwt(user);
    await updateJwtCookie(jwt);
    return true;
  }
  return false;
}

export async function makeJwt(user: User) {
  const expiresIn = new Date(new Date().setDate(new Date().getDate() + 1));
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";
  const jwt = await new jose.SignJWT({
    userId: user.id,
    fullName: user.lastName.concat(" ", user.firstName),
    role: user.role,
  })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(expiresIn)

    .sign(secret);
  return jwt;
}

export async function updateJwtCookie(jwt: string) {
  var decoded = jwtDecoded(jwt);
  cookies().set({
    name: "authToken",
    value: jwt,
    expires: decoded.exp,
    httpOnly: true,
    secure: true,
  });
}
