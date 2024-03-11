import React from "react";
import jwtDecoded from "../../../../server/auth/jwtDecoded";
import { UserRole } from "@prisma/client";
import LaboDashboard from "./LaboDashboard";
import Welcome from "./Welcome";

export default async function page() {
  const userRole = jwtDecoded().role;
  if ([UserRole.Lab, UserRole.Admin].includes(userRole as any)) {
    return <LaboDashboard />;
  }
  if ([UserRole.Nurse].includes(userRole as any)) {
    return (
      <div className="">
        <h1>hey Nurse</h1>
        <LaboDashboard />;
      </div>
    );
  }
  return <Welcome />;
}
