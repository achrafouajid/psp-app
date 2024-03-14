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
import { LiaUserInjuredSolid } from "react-icons/lia";
import getAllPatients from "../../../../../server/patient/getAllpatients";
import { Selection } from "@syncfusion/ej2-react-charts";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/Contexts/ThemeContext";
import Link from "next/link";
import { PiFiles } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";

const PatientList = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getAllPatients>>;
}) => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const { currentColor, currentMode } = useStateContext();
  const router = useRouter();

  const PatientAction = (props: any) => (
    <div className="flex gap-1 justify-center">
      <Link
        className="flex justify-center items-center"
        href={`/patients/${props.id}/requests`}
      >
        <PiFiles size={33} style={{ color: "#396EA5" }} />
      </Link>
      <Link
        className="flex justify-center items-center"
        href={`/patients/${props.id}`}
      >
        <CiSettings size={33} style={{ color: "#396EA5" }} />
      </Link>
    </div>
  );
  const employeesGrid = [
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
      headerText: "Date de naissance",
      field: "birthDate",
      width: "135",
      format: "yMd",
      textAlign: "start",
    },

    {
      headerText: "Addresse",
      width: "120",
      textAlign: "start",
      field: "address",
    },
    {
      headerText: "Téléphone",
      width: "120",
      textAlign: "start",
      field: "tel",
    },
    {
      headerText: "Programme",
      width: "80",
      textAlign: "start",
      field: "program",
    },

    {
      headerText: "Notes",
      field: "notes",
      width: "120",
      textAlign: "start",
    },
    {
      headerText: "Demandes",
      field: "requests",
      width: "100",
      textAlign: "start",
    },
    {
      headerText: "Médecin",
      field: "doctor",
      width: "100",
      textAlign: "start",
    },
    {
      headerText: "Date d'ajout",
      field: "created",
      width: "100",
      textAlign: "start",
    },
    {
      headerText: "Actions",
      width: "75",
      template: PatientAction,
      textAlign: "start",
    },
  ];
  return (
    <>
      <GridComponent
        dataSource={data.map((e) => ({
          tel: e.tel,
          patientno: e.patientno,
          notes: e.notes,
          program: e.program,
          birthDate: e.birthDate,
          avatar: e.image?.url,
          address: e.address ?? "-",
          name: e.lastName.concat(" ", e.firstName),
          id: e.id,
          requests: e.requests.length,
          doctor: e.doctor?.firstName.concat(" ", e.doctor?.lastName),
          created: e.createdAt.toLocaleString("fr"),
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
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Search, Page, Selection, Toolbar, Edit, Sort, Filter]}
        />
      </GridComponent>
      <div className="mt-5 flex justify-between">
        <Button
          onClick={() => {
            router.push("/add-patient");
          }}
          color="white"
          icon={<LiaUserInjuredSolid />}
          bgColor={currentColor}
          text="+ Patient"
          borderRadius="10px"
        />
      </div>
    </>
  );
};
export default PatientList;
