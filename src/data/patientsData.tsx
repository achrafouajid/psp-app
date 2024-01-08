import Link from "next/link";
import React from "react";
import { CiSettings } from "react-icons/ci";

const gridEmployeeProfile = (props: any) =>
  props.avatar ? (
    <img className="rounded-full w-10 h-10" src={props.avatar} alt="employee" />
  ) : (
    <div className="rounded-full w-10 h-10"></div>
  );

const gridPatientProfile = (props: any) => (
  <Link href={`/patients/${props.id}`}>
    <CiSettings />
  </Link>
);
export const employeesGrid = [
  {
    headerText: "",
    width: "40px",
    template: gridEmployeeProfile,
    textAlign: "Center",
  },
  {
    headerText: "Patient",
    width: "150",
    field: "name",
    textAlign: "start",
  },
  {
    headerText: "Date de naissance",
    field: "birthDate",
    width: "135",
    format: "yMd",
    textAlign: "Center",
  },

  {
    headerText: "Addresse",
    width: "120",
    textAlign: "Center",
    field: "address",
  },
  {
    headerText: "Programme",
    width: "170",
    textAlign: "Center",
    field: "program",
  },

  {
    headerText: "Notes",
    field: "notes",
    width: "120",
    textAlign: "Center",
  },
  {
    headerText: "",
    width: "40px",
    template: gridPatientProfile,
    textAlign: "Center",
  },
];
