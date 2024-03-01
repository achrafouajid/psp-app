import Header from "@/components/Header";
import React from "react";
import AppointmentList from "./AppointmentList";
import getAppointments from "../../../../../server/appointment/get_appointments";
import AddAppointmentPopUp from "./AddAppointmentPopUp";
import getAllPatients from "../../../../../server/patient/getAllpatients";
import getAllDoctors from "../../../../../server/doctor/getAllDoctors";

export default async function page() {
  const data = await getAppointments();
  const patients = await getAllPatients();
  const doctors = await getAllDoctors();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header category="Applications" title="Liste des Rendez-vous" />
      <AddAppointmentPopUp patients={patients} doctors={doctors} />
      <AppointmentList data={data} />
    </div>
  );
}
