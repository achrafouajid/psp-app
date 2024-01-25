import React from "react";
import getPatientRequests from "../../../../../../../server/patient/requests/get_patient_requests";
import RequestListPatient from "./RequestListPatient";

export default async function page({ params: { patientId } }: any) {
  const data = await getPatientRequests(patientId);
  return <RequestListPatient data={data} />;
}
