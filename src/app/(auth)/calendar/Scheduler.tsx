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
} from "@syncfusion/ej2-react-schedule";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Button } from "@nextui-org/react";
import getAppointments from "../../../../server/appointment/get_appointments";

const PropertyPane = (props: { children?: React.ReactNode }) => (
  <div className="mt-5">{props.children}</div>
);

const Scheduler = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getAppointments>>;
}) => {
  const scheduleObj = useRef<any>(null);

  const fieldsData = {
    id: "Id",
    subject: { name: "Subject", title: "Event Name" },
    location: { name: "Location", title: "Event Location" },
    description: { name: "Description", title: "Event Description" },
    startTime: { name: "StartTime", title: "Start Duration" },
    endTime: { name: "EndTime", title: "End Duration" },
  };
  const scheduleData = [
    {
      Id: 3,
      Subject: "Testing",
      StartTime: new Date(2018, 1, 11, 9, 0),
      EndTime: new Date(2018, 1, 11, 10, 0),
    },
    {
      Id: 4,
      Subject: "Vacation",
      StartTime: new Date(2018, 1, 13, 9, 0),
      EndTime: new Date(2018, 1, 13, 10, 0),
    },
  ];
  const eventSettings = { dataSource: scheduleData };

  const onClickAdd = () => {
    let Data = data.map((appointment) => ({
      Id: appointment.id, // Assuming 'id' is the unique identifier for appointments
      Subject: appointment.subject, // Assuming 'subject' is the title of the appointment
      StartTime: new Date(appointment.startTime), // Convert startTime to Date object
      EndTime: new Date(appointment.endTime), // Convert endTime to Date object
      // Add any other fields you need here
    }));
    if (scheduleObj.current) {
      scheduleObj.current.addEvent(Data);
    }
  };

  const onClickSave = () => {
    let Data = {
      Id: 3,
      Subject: "Testing-edited",
      StartTime: new Date(2018, 1, 11, 10, 0),
      EndTime: new Date(2018, 1, 11, 11, 0),
    };
    if (scheduleObj.current) {
      scheduleObj.current.saveEvent(Data);
    }
  };

  const onClickDelete = () => {
    if (scheduleObj.current) {
      scheduleObj.current.deleteEvent(4);
    }
  };

  return (
    <>
      <div>
        <Button id="add" title="Add" onClick={onClickAdd}>
          Add
        </Button>
        <Button id="edit" title="Edit" onClick={onClickSave}>
          Edit
        </Button>
        <Button id="delete" title="Delete" onClick={onClickDelete}>
          Delete
        </Button>{" "}
        <ScheduleComponent
          ref={scheduleObj}
          width="100%"
          height="550px"
          selectedDate={new Date()}
          eventSettings={eventSettings}
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
