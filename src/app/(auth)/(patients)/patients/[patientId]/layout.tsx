import PatientProvider from "@/Contexts/PatientContext";
import React from "react";
import getPatient from "../../../../../../server/patient/get_patient";
import { notFound } from "next/navigation";

export default async function layout({ children, params: { patientId } }: any) {
  const patient = await getPatient(patientId);
  if (!patient) notFound();
  return <PatientProvider patient={patient}>{children}</PatientProvider>;
}
