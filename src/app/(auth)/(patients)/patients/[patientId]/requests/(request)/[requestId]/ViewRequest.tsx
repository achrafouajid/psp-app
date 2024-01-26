"use client";
import React from "react";
import getRequest from "../../../../../../../../../server/patient/requests/getRequest";
import { RequestStatusEnum } from "@prisma/client";
import ConstituteRequest from "./ConstituteRequest";
import CompleteRequest from "./CompleteRequest";
import StatusRequest from "./StatusRequest";
import AcceptedRequest from "./AcceptedRequest";
import RefusedRequest from "./RefusedRequest";
import { useRequest } from "@/Contexts/RequestContext";

export default function ViewRequest() {
  const { data } = useRequest();
  const currentStatus = data.statuses.find((e) => e.current);

  if (currentStatus?.status == RequestStatusEnum.Cree)
    return <ConstituteRequest data={data} />;
  else if (currentStatus?.status == RequestStatusEnum.Constitue)
    return <CompleteRequest data={data} />;
  else if (currentStatus?.status == RequestStatusEnum.Complete)
    return <StatusRequest data={data} />;
  else if (currentStatus?.status == RequestStatusEnum.Attente)
    return <StatusRequest data={data} />;
  else if (currentStatus?.status == RequestStatusEnum.Accepte)
    return <AcceptedRequest data={data} />;
  else if (currentStatus?.status == RequestStatusEnum.Refuse)
    return <RefusedRequest data={data} />;
}
