"use client";
import React from "react";
import { useStateContext } from "@/Contexts/ThemeContext";
import getRequest from "../../../../../../../../../../server/patient/requests/getRequest";
import ModifyRequest from "../ModifyRequest";

export default function StatusRequest({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof getRequest>>>;
}) {
  const { currentColor } = useStateContext();
  const currentStatus = data.statuses.find((e) => e.current);

  return <ModifyRequest data={data} />;
}
