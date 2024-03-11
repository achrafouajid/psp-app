import React from "react";
import getAllPatients from "../../../../../server/patient/getAllpatients";
import PatientList from "./PatientList";
import Header from "@/components/Header";
import { Divider } from "@nextui-org/react";
import PatientCallList from "./PatientCallList";
import { getAllCallPatients } from "../../../../../server/patient/getAllCallPatients";

export default async function page() {
  const data = await getAllPatients();
  const call = await getAllCallPatients();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header category="Patients" title="Liste des patients" />
      <PatientList data={data} />
      <Divider className="my-4" />
      <Header category="" title="Patients à rappeler" />
      <PatientCallList call={call} />
    </div>
  );
}
