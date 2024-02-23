import React from "react";
import Scheduler from "./Scheduler";
import Header from "@/components/Header";
import getAppointments from "../../../../server/appointment/get_appointments";
import AddAppointmentPopUp from "./AddAppointmentPopUp";
import getAllPatients from "../../../../server/patient/getAllpatients";

export default async function page() {
  const data = await getAppointments();
  const patients = await getAllPatients();
  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
        <Header
          category="Applications"
          title="Prise de rendez vous et de médicaments"
        />
        <AddAppointmentPopUp patients={patients} />
        <Scheduler data={data} />
      </div>
    </>
  );
}
