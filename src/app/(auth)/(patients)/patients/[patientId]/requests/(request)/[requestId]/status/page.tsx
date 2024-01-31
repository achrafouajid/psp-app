"use client";
import React from "react";
import Status from "./Status";
import { useRequest } from "@/Contexts/RequestContext";

export default function page({ params: { patientId, requestId } }: any) {
  const { data } = useRequest();
  const currentStatus = data.statuses.find((e) => e.current);

  return <Status data={data} />;
}
