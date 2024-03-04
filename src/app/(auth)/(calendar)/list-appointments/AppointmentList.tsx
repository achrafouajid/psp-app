"use client";
import React from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Sort,
  Toolbar,
  Edit,
  Filter,
} from "@syncfusion/ej2-react-grids";

import { Selection } from "@syncfusion/ej2-react-charts";
import getAppointments from "../../../../../server/appointment/get_appointments";
import Link from "next/link";

import { LuCalendarOff } from "react-icons/lu";
import { Button } from "@nextui-org/react";
import removeAppointment from "../../../../../server/appointment/remove_appointment";
import { MdSchedule } from "react-icons/md";
import EditAppointmentPopUp from "./EditAppointmentPopUp";

const AppointmentList = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getAppointments>>;
}) => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete", "Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const ApptAction = (props: any) => {
    return (
      <div className="flex gap-1 justify-around">
        <Button isIconOnly color="danger" variant="bordered">
          <LuCalendarOff
            size={25}
            style={{ color: "red" }}
            onClick={() => {
              removeAppointment(props.id);
            }}
          />
        </Button>
        <Button isIconOnly color="primary" variant="bordered"></Button>
      </div>
    );
  };

  const apptGrid = [
    {
      headerText: "Patient",
      field: "name",
      width: "100",
      format: "yMd",
      textAlign: "start",
    },
    {
      headerText: "Rendez-vous",
      field: "subject",
      width: "100",
      format: "yMd",
      textAlign: "start",
    },
    {
      headerText: "Date",
      field: "time",
      width: "150",
      format: "yMd",
      textAlign: "start",
    },
    {
      headerText: "Durée",
      field: "duration",
      width: "75",
      format: "yMd",
      textAlign: "start",
    },
    {
      headerText: "Médecin",
      field: "doctor",
      width: "100",
      textAlign: "start",
    },

    {
      headerText: "Status",
      width: "100",
      field: "status",
      textAlign: "start",
    },
    {
      headerText: "Salle/Fauteuil",
      width: "50",
      field: "room",
      textAlign: "start",
    },
    {
      headerText: "Commentaire",
      width: "50",
      field: "note",
      textAlign: "start",
    },
    {
      headerText: "Actions",
      width: "50",
      template: ApptAction,
      textAlign: "Center",
    },
  ];

  return (
    <div>
      <GridComponent
        dataSource={data.map((e) => {
          return {
            time:
              new Date(e.startTime).toLocaleString("fr") +
              " - " +
              new Date(e.endTime).toLocaleTimeString("fr"),
            duration:
              (new Date(e.endTime).getTime() -
                new Date(e.startTime).getTime()) /
                60000 /
                60 +
              "h",
            name: e.patient.firstName + " " + e.patient.lastName,
            room: e.room,
            doctor: e.doctor?.firstName + " " + e.doctor?.lastName,
            status: e.status,
            subject: e.subject,
            note: e.note,
            id: e.id,
          };
        })}
        width="auto"
        enableHover={true}
        allowPaging
        pageSettings={{ pageSize: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {apptGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Search, Page, Selection, Toolbar, Edit, Sort, Filter]}
        />
      </GridComponent>
    </div>
  );
};
export default AppointmentList;
