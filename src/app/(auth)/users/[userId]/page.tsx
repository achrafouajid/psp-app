"use server";
import React from "react";
import PatientProfile from "./UserProfile";
import { notFound } from "next/navigation";
import UserProfile from "./UserProfile";
import getUser from "../../../../../server/auth/get_user";

export default async function page({ params: { userId } }: any) {
  const user = await getUser(userId);
  if (!user) notFound();

  return (
    <div>
      <UserProfile data={user} />
    </div>
  );
}
