"use client";
import * as React from "react";
import { useRef, useState } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Inject,
  ActionEventArgs,
} from "@syncfusion/ej2-react-schedule";
import getAppointments from "../../../../../server/appointment/get_appointments";
import { EmitType } from "@syncfusion/ej2-base";

const PropertyPane = (props: { children?: React.ReactNode }) => (
  <div className="mt-5">{props.children}</div>
);

const Scheduler = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getAppointments>>;
}) => {
  const scheduleObj = useRef<ScheduleComponent>(null);

  const appos = data.map((appo) => ({
    Id: appo.id,
    Subject: appo.subject,
    Patient: appo.patientId,
    Doctor: appo.doctorId,
    StartTime: new Date(appo.startTime),
    EndTime: new Date(appo.endTime),
  }));

  const actionComplete: EmitType<ActionEventArgs> = (args: ActionEventArgs) => {
    console.log(args.requestType);
  };
  return (
    <>
      <div>
        <ScheduleComponent
          ref={scheduleObj}
          width="100%"
          height="550px"
          selectedDate={new Date()}
          actionComplete={actionComplete}
          eventSettings={{
            dataSource: appos,
            allowAdding: false,
            allowDeleting: false,
            allowEditing: false,
          }}
        >
          <ViewsDirective>
            <ViewDirective option="Day" />
            <ViewDirective option="Week" />
            <ViewDirective option="WorkWeek" />
            <ViewDirective option="Month" />
          </ViewsDirective>
          <Inject services={[Day, Week, WorkWeek, Month]} />
        </ScheduleComponent>
      </div>
    </>
  );
};
export default Scheduler;
