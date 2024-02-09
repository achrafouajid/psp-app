import React from "react";
import Status from "./Status";
import { useRequest } from "@/Contexts/RequestContext";

export default function page({ params: { patientId, requestId } }: any) {
  return <Status />;
}
