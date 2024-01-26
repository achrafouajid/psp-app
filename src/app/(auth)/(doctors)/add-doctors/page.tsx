import React from "react";
import Header from "@/components/Header";
import AddDoctor from "./AddDoctor";

export default function page() {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Médecins" title="Ajouter un médecin" />
      <AddDoctor />
    </div>
  );
}
