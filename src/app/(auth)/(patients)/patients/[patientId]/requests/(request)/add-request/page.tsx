"use client";
import React from "react";

import { notFound } from "next/navigation";
import { usePatient } from "@/Contexts/PatientContext";
import CreateRequest from "./CreateRequest";
import Header from "@/components/Header";

export default function page() {
  const patient = usePatient();
  if (!patient) notFound();

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header category="Patients" title="Créer Demande patient" />
      <CreateRequest data={patient} />
    </div>
  );
}
