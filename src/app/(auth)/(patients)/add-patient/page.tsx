import React from "react";
import AddPatient from "./AddPatient";
import Header from "@/components/Header";

export default function page() {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Patients" title="Créer un Dossier Patient" />
      <AddPatient />
    </div>
  );
}
