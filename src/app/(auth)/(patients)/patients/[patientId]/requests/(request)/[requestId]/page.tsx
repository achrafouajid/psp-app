import React from "react";
import ModifyRequest from "./ModifyRequest";

export default function page({ params: { patientId, requestId } }: any) {
  return <ModifyRequest />;
}
