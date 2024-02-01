import React from "react";
import getAllPatients from "../../../../../server/patient/getAllpatients";
import PageContent from "../patients/pageContent";
import AddPatientPopUp from "./AddPatientPopUp";
import getAllDoctors from "../../../../../server/doctor/getAllDoctors";
import Header from "@/components/Header";

export default async function page() {
  const data = await getAllPatients();
  const doctors = await getAllDoctors();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header category="Patients" title="Liste des patients" />
      <PageContent data={data} />
      <AddPatientPopUp doctors={doctors} />{" "}
    </div>
  );
}
