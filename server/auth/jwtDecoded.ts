import React from "react";
import * as jose from "jose";
import { cookies } from "next/headers";
import { JwtPayload } from "./types";

export default function jwtDecoded() {
  const authToken = cookies().get("authToken")!.value;
  const payload = jose.decodeJwt<JwtPayload>(authToken);
  return payload;
}
