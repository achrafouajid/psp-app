"use client";
import React, { useEffect } from "react";
import { useSession } from "@/Contexts/UserContext";
import currentUser from "../../../server/auth/currentUser";
import refreshToken from "../../../server/auth/refreshtoken";
import { useRouter } from "next/navigation";

export default function Refresher() {
  const user = useSession();
  async function compare() {
    var resuser = await currentUser();
    console.log(resuser?.role != user.role);
    if (resuser?.role != user.role) {
      await refreshToken();
    }
  }
  useEffect(() => {
    const timeout = setInterval(() => {
      console.log("refresh");
      compare();
    }, 1000 * 10);
    return () => {
      clearInterval(timeout);
    };
  }, [user]);

  return null;
}
