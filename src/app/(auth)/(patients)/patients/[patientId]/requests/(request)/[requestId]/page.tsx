import React from "react";
import ViewRequest from "./ViewRequest";
import { notFound } from "next/navigation";
import getRequest from "../../../../../../../../../server/patient/requests/getRequest";

export default async function page({ params: { patientId, requestId } }: any) {
  return (
    <div>
      <ViewRequest />
    </div>
  );
}
