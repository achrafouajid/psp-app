import React from "react";
import ViewRequest from "./ViewRequest";
import ModifyRequest from "./ModifyRequest";
import { useRequest } from "@/Contexts/RequestContext";

export default function page({ params: { patientId, requestId } }: any) {
  return <ModifyRequest />;
}
