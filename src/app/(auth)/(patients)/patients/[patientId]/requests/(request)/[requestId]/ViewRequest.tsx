"use client";
import React from "react";
import getRequest from "../../../../../../../../../server/patient/requests/getRequest";
import { RequestStatusEnum } from "@prisma/client";
import ConstituteRequest from "./ConstituteRequest";
import CompleteRequest from "./CompleteRequest";

export default function ViewRequest({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof getRequest>>>;
}) {
  const currentStatus = data.statuses.find((e) => e.current);

  if (currentStatus?.status == RequestStatusEnum.Created)
    return <ConstituteRequest data={data.Patient} />;
  else if (currentStatus?.status == RequestStatusEnum.Accepted)
    return <CompleteRequest data={data.Patient} />;
}
