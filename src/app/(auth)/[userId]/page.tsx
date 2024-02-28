import React from "react";

import { notFound } from "next/navigation";
import Header from "@/components/Header";
import getUser from "../../../../server/auth/get_user";
import UserProfileAdmin from "./UserProfileAdmin";

export default async function page({ params: { userId } }: any) {
  const user = await getUser(userId);
  if (!user) notFound();

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header
        category="Profil"
        title={`Informations de ${user.firstName} ${user.lastName}`}
      />
      <UserProfileAdmin data={user} />
    </div>
  );
}
