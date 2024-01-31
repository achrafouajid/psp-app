"use server";
import React from "react";
import AddPatient from "./AddPatient";
import Header from "@/components/Header";
import getAllDoctors from "../../../../../server/doctor/getAllDoctors";

export default async function page() {
  const doctors = await getAllDoctors();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header category="Patients" title="Créer un Dossier Patient" />
      <AddPatient doctors={doctors} />
    </div>
  );
}
