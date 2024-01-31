import Header from "@/components/Header";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header category="" title="" />
      <div className="mt-10">
        <p className="text-[#396EA5] text-xl">
          Vous n'êtes pas autorisé à accéder à cette page.
        </p>
        <Link href="./[#396EA5]" className="text-">
          Revenir en arrière
        </Link>
      </div>
    </div>
  );
}
