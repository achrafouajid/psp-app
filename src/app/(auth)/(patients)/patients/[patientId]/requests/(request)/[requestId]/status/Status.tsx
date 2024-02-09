"use client";
import React from "react";
import { useStateContext } from "@/Contexts/ThemeContext";
import getRequest from "../../../../../../../../../../server/patient/requests/getRequest";
import ModifyRequest from "../ModifyRequest";

export default function StatusRequest() {
  return <ModifyRequest />;
}
