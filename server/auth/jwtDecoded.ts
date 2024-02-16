import React from "react";
import * as jose from "jose";
import { cookies } from "next/headers";
import { JwtPayload } from "./types";

export default function jwtDecoded(jwt?: string) {
  const authToken = jwt ?? cookies().get("authToken")!.value;
  const payload = jose.decodeJwt<JwtPayload>(authToken);
  payload.exp = (payload.exp ?? 0) * 1000;
  console.log(payload.exp);
  return payload;
}
