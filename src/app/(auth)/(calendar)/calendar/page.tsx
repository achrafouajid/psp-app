import React from "react";
import Scheduler from "./Scheduler";
import Header from "@/components/Header";
import getAppointments from "../../../../../server/appointment/get_appointments";
import SchedulerTest from "./SchedulerTest";

export default async function page() {
  const data = await getAppointments();

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
        <Header
          category="Applications"
          title="Prise de rendez vous et de médicaments"
        />
        <Scheduler data={data} />
      </div>
    </>
  );
}
