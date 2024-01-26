import React from "react";
import getAllDoctors from "../../../../../server/doctor/getAllDoctors";
import DoctorList from "./DoctorList";

export default async function page() {
  const data = await getAllDoctors();
  return <DoctorList data={data} />;
}
