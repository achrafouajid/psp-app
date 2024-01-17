import React from "react";
import ViewRequest from "./ViewRequest";
import getPatientRequests from "../../../../../../../../server/patient/requests/get_patient_requests";
import { notFound } from "next/navigation";
import getRequest from "../../../../../../../../server/patient/requests/getRequest";

export default async function page({ params: { patientId, requestId } }: any) {
  const data = await getRequest(requestId, patientId);
  if (!data) notFound();
  return (
    <div>
      <ViewRequest data={data} />
    </div>
  );
}
