import React from "react";
import DoctorProfile from "./DoctorProfile";
import getAllRegions from "../../../../../../server/region/getAllRegions";
import prisma from "../../../../../../prisma/client";
import getDoctor from "../../../../../../server/doctor/get_doctor";

export default async function page({ params: { doctorId } }: any) {
  const regions = await getAllRegions();
  const data = await getDoctor(doctorId);
  return <DoctorProfile regions={regions} data={data} />;
}
