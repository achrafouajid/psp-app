"use server";
import React from "react";
import Header from "@/components/Header";
import AddDoctor from "./AddDoctor";
import getAllRegions from "../../../../../server/region/getAllRegions";

export default async function page() {
  const regions = await getAllRegions();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header category="Médecins" title="Ajouter un médecin" />
      <AddDoctor regions={regions} />
    </div>
  );
}
