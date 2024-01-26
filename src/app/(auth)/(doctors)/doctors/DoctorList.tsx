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

const DoctorList = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getAllDoctors>>;
}) => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
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
      field: "prio",
      width: "50",
      textAlign: "Center",
    },
  ];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
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
          region: e.region,
          priority: e.priority,
          name: e.title.concat(e.lastName, " ", e.firstName),
          id: e.id,
        }))}
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
