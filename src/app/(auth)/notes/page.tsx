import React from "react";
import Kanban from "./Kanban";
import Header from "@/components/Header";

export default function page() {
  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
        <Header category="Applications" title="Notes" />
        <Kanban />
      </div>
    </>
  );
}
