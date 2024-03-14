"use client";
import React, { useEffect, useState } from "react";
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
import { Button, Chip, useDisclosure } from "@nextui-org/react";
import removeAppointment from "../../../../../server/appointment/remove_appointment";
import { MdSchedule } from "react-icons/md";
import EditAppointmentPopUp from "./EditAppointmentPopUp";
import getAllPatients from "../../../../../server/patient/getAllpatients";
import getAllDoctors from "../../../../../server/doctor/getAllDoctors";
import { useStateContext } from "@/Contexts/ThemeContext";
import { AppointmentStatusEnum } from "@prisma/client";
import { updateExpiredAppointments } from "../../../../../server/appointment/update_expired_appointments";
const ApptAction = (props: any) => {
  const [open, setopen] = useState(false);

  return (
    <div className="flex gap-1 justify-around">
      <Button
        onClick={() => {
          removeAppointment(props.id);
        }}
        isIconOnly
        color="danger"
        variant="bordered"
      >
        <LuCalendarOff size={25} style={{ color: "red" }} />
      </Button>

      <EditAppointmentPopUp
        patients={props.patients}
        doctors={props.doctors}
        appointment={props.appointment}
        isOpen={open}
        onOpenChange={setopen}
      />

      <Button
        onClick={(e) => setopen(true)}
        isIconOnly
        color="primary"
        variant="bordered"
      >
        <MdSchedule size={25} style={{ color: "#396EA5" }} />
      </Button>
    </div>
  );
};
const AppointmentList = ({
  data,
  patients,
  doctors,
}: {
  patients: NonNullable<Awaited<ReturnType<typeof getAllPatients>>>;
  doctors: NonNullable<Awaited<ReturnType<typeof getAllDoctors>>>;
  data: Awaited<ReturnType<typeof getAppointments>>;
}) => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Search"];

  useEffect(() => {
    updateExpiredAppointments();
  }, []);

  const appoStatus = (props: any) => {
    let bgColor = ""; // Default color
    let statusTranslation = "";
    switch (props.status) {
      case AppointmentStatusEnum.Pending:
        bgColor = "#4CAF50"; // Green for success
        statusTranslation = "En cours";
        break;
      case AppointmentStatusEnum.Rescheduled:
        bgColor = "#f7cb73"; // Yelllow for pending
        statusTranslation = "Reporté";
        break;
      case AppointmentStatusEnum.Expired:
        bgColor = "#F44336"; // Red for expired
        statusTranslation = "Dépassé";
        break;

      default:
        bgColor = "#f7cb73"; // Default color if status is not recognized
        statusTranslation = props.status;
        return { status: statusTranslation, bgColor };
    }

    return (
      <Chip size="lg" style={{ backgroundColor: bgColor, color: "white" }}>
        {props.statusTranslation || statusTranslation}
      </Chip>
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
      template: appoStatus,
      width: "100",
      field: "status",
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
            doctor: e.doctor?.firstName + " " + e.doctor?.lastName,
            status: e.status,
            subject: e.subject,
            note: e.note,
            id: e.id,
            patients,
            doctors,
            appointment: e,
          };
        })}
        width="auto"
        enableHover={true}
        allowPaging
        pageSettings={{ pageSize: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
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
