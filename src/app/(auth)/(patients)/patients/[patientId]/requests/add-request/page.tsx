"use server";
import React from "react";
import FirstRequest from "./FirstRequest";
import getPatient from "../../../../../../../../server/patient/get_patient";
import { notFound } from "next/navigation";

export default async function page({ params: { patientId } }: any) {
  const patient = await getPatient(patientId);
  if (!patient) notFound();

  return (
    <div>
      <FirstRequest data={patient} />
    </div>
  );
}
