import Header from "@/components/Header";
import Link from "next/link";
import React from "react";
import { IoArrowUndoOutline } from "react-icons/io5";

export default function page() {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header
        category="ERREUR"
        title="Vous n'êtes pas autorisé à accéder à cette page."
      />
      <div className="mt-10">
        <Link href="./" className="text-[#396EA5] text-xl flex">
          <IoArrowUndoOutline size={24} />
          Revenir en arrière
        </Link>
      </div>
    </div>
  );
}
