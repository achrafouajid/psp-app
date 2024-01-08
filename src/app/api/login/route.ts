import fs from "fs";
import { join } from "path";
import login from "../../../../server/auth/login";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

type PostBody = {
  body: {
    username: string;
    password: string;
  };
};

export async function POST(req: Request) {
  const body: PostBody["body"] = await req.json();
  const { username, password } = body;

  var res = await login(username, password);
  if (res == false) {
    return Response.json({
      success: false,
    });
  } else {
    redirect("/home");
  }
}
