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
import Header from "@/components/Header";
import { Selection } from "@syncfusion/ej2-react-charts";
import getAllDoctors from "../../../../../server/doctor/getAllDoctors";
import Link from "next/link";
import { CiSettings } from "react-icons/ci";
import { PriorityEnum } from "@prisma/client";
import { Chip } from "@nextui-org/react";

const DoctorList = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getAllDoctors>>;
}) => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Search"];
  const Priority = (props: any) => {
    let bgColor = ""; // Default color
    switch (props.priority) {
      case PriorityEnum.LVT:
        bgColor = "#4CAF50"; // Green for success
        break;

      case PriorityEnum.HVT:
        bgColor = "#F44336"; // Red for expired

        break;

      default:
        bgColor = "#f7cb73"; // Default color if status is not recognized
    }

    return (
      <Chip size="lg" style={{ backgroundColor: bgColor, color: "white" }}>
        {props.priority}
      </Chip>
    );
  };

  const DocAction = (props: any) => (
    <div className="flex gap-1 justify-end">
      <Link
        href={`/doctors/${props.id}`}
        className="flex justify-center items-center"
      >
        <CiSettings size={25} style={{ color: "#396EA5" }} />
      </Link>
    </div>
  );
  const doctorGrid = [
    {
      headerText: "Médecin",
      width: "100",
      field: "name",
      textAlign: "start",
    },
    {
      headerText: "Service",
      field: "service",
      width: "50",
      format: "yMd",
      textAlign: "Center",
    },

    {
      headerText: "Secteur",
      width: "50",
      textAlign: "Center",
      field: "secteur",
    },
    {
      headerText: "Nombre de Dossiers",
      width: "50",
      textAlign: "Center",
      field: "Number",
    },
    {
      headerText: "Région",
      field: "region",
      width: "50",
      textAlign: "Center",
    },
    {
      headerText: "Attaché hopitalier",
      field: "attache",
      width: "50",
      textAlign: "Center",
    },
    {
      headerText: "Ville",
      field: "city",
      width: "50",
      textAlign: "Center",
    },
    {
      headerText: "Priority High/Low ( HVT / LTV )",
      field: "priority",
      width: "50",
      textAlign: "Center",
      template: Priority,
    },
    {
      headerText: "Actions",
      width: "40",
      template: DocAction,
      textAlign: "Center",
    },
  ];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header
        category="Médecins"
        title="Tableau de classification des médecins"
      />
      <GridComponent
        dataSource={data.map((e) => ({
          service: e.service,
          Number: e._count.Patient,
          establishment: e.establishment,
          secteur: e.secteur,
          region: e.city?.region.name,
          city: e.city?.name,
          priority: e.priority,
          name: e.title.concat(". ", e.lastName, " ", e.firstName),
          id: e.id,
          attache: e.city?.region.attache,
        }))}
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
          {doctorGrid.map((item, index) => (
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
export default DoctorList;
