"use client";
import React from "react";

import { notFound } from "next/navigation";
import { usePatient } from "@/Contexts/PatientContext";
import FirstRequest from "./FirstRequest";
import SecondRequest from "./SecondRequest";
import ThirdRequest from "./ThirdRequest";

export default async function page() {
  const patient = usePatient();
  if (!patient) notFound();

  return (
    <div>
      <FirstRequest data={patient} />
      <SecondRequest data={patient} />
      <ThirdRequest data={patient} />
    </div>
  );
}
