"use client";
import React from "react";
import Kanban from "./Kanban";
import Header from "@/components/Header";

export default function page() {
  return (
    <>
      <Header category="App" title="Kanban" />
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Kanban />
      </div>
    </>
  );
}
