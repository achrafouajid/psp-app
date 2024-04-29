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
import { useRouter } from "next/navigation";
import { useStateContext } from "@/Contexts/ThemeContext";
import { getAllCallPatients } from "../../../../../server/patient/getAllCallPatients";

const PatientCallList = ({
  call,
}: {
  call: Awaited<ReturnType<typeof getAllCallPatients>>;
}) => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete", "Search"];
  const callPatientsGrid = [
    {
      headerText: "ID Patient",
      width: "100px",
      field: "patientno",
      textAlign: "start",
    },
    {
      headerText: "Patient",
      width: "100",
      field: "name",
      textAlign: "start",
    },
    {
      headerText: "Temps depuis l'acceptation ou refus",
      field: "time",
      width: "135",
      format: "yMd",
      textAlign: "start",
    },

    {
      headerText: "Téléphone",
      width: "120",
      textAlign: "start",
      field: "tel",
    },

    {
      headerText: "Demandes",
      field: "requests",
      width: "100",
      textAlign: "start",
    },
  ];

  return (
    <>
      <GridComponent
        dataSource={call.map((e) => ({
          patientno: e?.patient.patientno,
          name: e?.patient.firstName.concat(" ", e?.patient.lastName),
          time: e?.timeSinceStatus + " jours",
          tel: e?.patient.tel,
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
          {callPatientsGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Search, Page, Selection, Toolbar, Edit, Sort, Filter]}
        />
      </GridComponent>
    </>
  );
};
export default PatientCallList;
