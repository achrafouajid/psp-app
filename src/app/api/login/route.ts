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
  try {
    const body: PostBody["body"] = await req.json();
    const { username, password } = body;

    var res = await login(username, password);
    if (res == false) {
      return Response.json({
        success: false,
      });
    } else {
      var url = new URL(req.url);
      url.pathname = "/home";
      return Response.redirect(url);
    }
  } catch (r) {
    console.log(r);
    return Response.json({
      success: false,
    });
  }
}
