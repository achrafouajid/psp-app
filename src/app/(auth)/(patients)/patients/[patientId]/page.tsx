"use server";
import React from "react";
import PatientProfile from "./PatientProfile";
import getPatient from "../../../../../../server/patient/get_patient";
import { notFound } from "next/navigation";

export default async function page({ params: { patientId } }: any) {
  return (
    <div>
      <PatientProfile />
    </div>
  );
}
