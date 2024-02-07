"use server";
import * as jose from "jose";
import currentUser from "./currentUser";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function refreshToken() {
  var user = await currentUser();
  if (!user) redirect("/logout");
  const expiresIn = new Date(new Date().setMonth(new Date().getMonth() + 1));
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

  cookies().set({
    name: "authToken",
    value: jwt,
    expires: expiresIn,
    httpOnly: true,
    secure: true,
  });
  revalidatePath("/");
}
