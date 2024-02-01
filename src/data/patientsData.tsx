import { routes } from "@/utils/routes";
import Link from "next/link";
import React from "react";
import { CiSettings } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { FiFilePlus } from "react-icons/fi";

export const gridProfile = (props: any) =>
  props.avatar ? (
    <img className="rounded-full w-10 h-10" src={props.avatar} alt="employee" />
  ) : (
    <div className="rounded-full w-10 h-10"></div>
  );
const gridView = (props: any) => (
  <Link
    href={routes.patientRequest(props.patientId, props.requestId)}
    className="flex justify-center items-center"
  >
    <FaRegEye size={25} style={{ color: "#396EA5" }} />
  </Link>
);
const gridPatientProfile = (props: any) => (
  <Link
    className="flex justify-center items-center"
    href={`/patients/${props.id}`}
  >
    <CiSettings size={25} style={{ color: "#396EA5" }} />
  </Link>
);
const gridAddReq = (props: any) => (
  <Link
    className="flex justify-center items-center"
    href={`/patients/${props.id}/requests/add-request`}
  >
    <FiFilePlus size={25} style={{ color: "#396EA5" }} />
  </Link>
);
export const employeesGrid = [
  {
    headerText: "",
    width: "40px",
    template: gridProfile,
    textAlign: "Center",
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
    width: "80",
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
    headerText: "Demande",
    field: "requests",
    width: "100",
    textAlign: "Center",
  },
  {
    headerText: "Créer Demande",
    width: "100",
    template: gridAddReq,
    textAlign: "Center",
  },
  {
    headerText: "Paramètres",
    width: "80",
    template: gridPatientProfile,
    textAlign: "Center",
  },
];
export const reqGrid = [
  {
    headerText: "Numéro de Demande",
    field: "number",
    width: "10",
    format: "yMd",
    textAlign: "left",
  },
  {
    headerText: "Nom du Patient",
    field: "name",
    width: "120",
    format: "yMd",
    textAlign: "left",
  },
  {
    headerText: "Date de création",
    field: "date",
    width: "50",
    format: "yMd",
    textAlign: "Center",
  },

  {
    headerText: "Remarque",
    field: "remark",
    width: "120",
    textAlign: "Center",
  },

  {
    headerText: "Nb de documents",
    width: "100",
    field: "documentCount",
    textAlign: "Center",
  },
  {
    headerText: "Dernier status",
    width: "100",
    field: "status",
    textAlign: "Center",
  },
  {
    headerText: "Visualiser",
    width: "40",
    template: gridView,
    textAlign: "Center",
  },
];
