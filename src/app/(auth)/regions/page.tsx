import Header from "@/components/Header";
import React from "react";
import PopUp from "./PopUp";
import RegionList from "./RegionList";

export default function page() {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header category="Régions" title="Gestion Régions" />

      <PopUp />

      <RegionList />
    </div>
  );
}
