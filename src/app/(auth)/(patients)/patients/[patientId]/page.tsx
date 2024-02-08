"use server";
import React from "react";
import PatientProfile from "./PatientProfile";
import getPatient from "../../../../../../server/patient/get_patient";
import { notFound } from "next/navigation";
import PatientProfileCopy from "./PatientProfile copy";
import getAllDoctors from "../../../../../../server/doctor/getAllDoctors";

export default async function page({ params: { patientId } }: any) {
  const doctors = await getAllDoctors();
  return (
    <div>
      <PatientProfileCopy doctors={doctors} />
    </div>
  );
}
