"use server";
import React from "react";

import UserProfile from "./UserProfile";
import Header from "@/components/Header";

export default async function page() {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header category="Profil" title="Votre Profil" />
      <UserProfile />
    </div>
  );
}
