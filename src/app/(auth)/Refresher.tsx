"use client";
import React, { useEffect } from "react";
import { useSession } from "@/Contexts/UserContext";
import currentUser from "../../../server/auth/currentUser";
import refreshToken from "../../../server/auth/refreshtoken";
import { usePathname } from "next/navigation";

export default function Refresher() {
  const user = useSession();
  const pathname = usePathname();
  async function compare() {
    try {
      var resuser = await currentUser();
      if (resuser?.role != user.role) {
        await refreshToken();
      }
    } catch (error) {}
  }
  useEffect(() => {
    compare();
  }, [pathname]);

  return null;
}
