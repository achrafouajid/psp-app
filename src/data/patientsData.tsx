import { routes } from "@/utils/routes";
import Link from "next/link";
import React from "react";
import { CiSettings } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { PiFiles } from "react-icons/pi";

export const gridProfile = (props: any) =>
  props.avatar ? (
    <img className="rounded-full w-10 h-10" src={props.avatar} alt="employee" />
  ) : (
    <div className="rounded-full w-10 h-10"></div>
  );
const ReqAction = (props: any) => (
  <div className="flex gap-1 justify-end">
    <Link
      href={routes.patientRequest(props.patientId, props.requestId)}
      className="flex justify-center items-center"
    >
      <FaRegEye size={25} style={{ color: "#396EA5" }} />
    </Link>
    {/*<Link
      href={routes.patientRequests(props.patientId)}
      className="flex justify-center items-center"
    >
      <LuFileEdit size={25} style={{ color: "#396EA5" }} />
    </Link>*/}
  </div>
);

const PatientAction = (props: any) => (
  <div className="flex gap-1 justify-center">
    <Link
      className="flex justify-center items-center"
      href={`/patients/${props.id}/requests`}
    >
      <PiFiles size={25} style={{ color: "#396EA5" }} />
    </Link>
    <Link
      className="flex justify-center items-center"
      href={`/patients/${props.id}`}
    >
      <CiSettings size={25} style={{ color: "#396EA5" }} />
    </Link>
  </div>
);
export const employeesGrid = [
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
    headerText: "Actions",
    width: "75",
    template: PatientAction,
    textAlign: "start",
  },
];
export const reqGrid = [
  {
    headerText: "No demande",
    field: "number",
    width: "50",
    format: "yMd",
    textAlign: "start",
  },
  {
    headerText: "Nom du Patient",
    field: "name",
    width: "100",
    format: "yMd",
    textAlign: "start",
  },
  {
    headerText: "Date de création",
    field: "date",
    width: "100",
    format: "yMd",
    textAlign: "start",
  },

  {
    headerText: "Remarque",
    field: "remark",
    width: "120",
    textAlign: "start",
  },

  {
    headerText: "Nb de documents",
    width: "100",
    field: "documentCount",
    textAlign: "start",
  },
  {
    headerText: "Dernier status",
    width: "100",
    field: "status",
    textAlign: "start",
  },
  {
    headerText: "Actions",
    width: "40",
    template: ReqAction,
    textAlign: "start",
  },
];
