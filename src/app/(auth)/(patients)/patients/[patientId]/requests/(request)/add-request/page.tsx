"use client";
import React from "react";

import { notFound } from "next/navigation";
import { usePatient } from "@/Contexts/PatientContext";
import CreateRequest from "./CreateRequest";

export default async function page() {
  const patient = usePatient();
  if (!patient) notFound();

  return (
    <div>
      <CreateRequest data={patient} />
    </div>
  );
}
