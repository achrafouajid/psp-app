import React from "react";
import getAllRequests from "../../../../../../../server/patient/requests/getAllRequests";
import Request from "./Request";

export default async function page({ params: { patientId } }: any) {
  const data = await getAllRequests(patientId);
  return <Request data={data} />;
}
