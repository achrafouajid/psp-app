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
import getPatientRequests from "../../../../../../../server/patient/requests/get_patient_requests";
import Link from "next/link";
import AddReqPopUp from "./AddReqPopUp";
import { routes } from "@/utils/routes";
import { FaRegEye } from "react-icons/fa6";
import { RequestStatusEnum } from "@prisma/client";
import { Chip } from "@nextui-org/react";

const RequestListPatient = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getPatientRequests>>;
}) => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Search"];
  const Status = (props: any) => {
    let bgColor = ""; // Default color
    let statusTranslation = "";
    switch (props.status) {
      case RequestStatusEnum.Accepte:
        bgColor = "#28a745"; // Green for success
        statusTranslation = "Accepté";
        break;
      case RequestStatusEnum.Attente:
        bgColor = "#ffc107"; // Yelllow for pending
        statusTranslation = "Attente";
        break;
      case RequestStatusEnum.Refuse:
        bgColor = "#dc3545"; // Red for expired
        statusTranslation = "Refusé";
        break;
      case RequestStatusEnum.Complete:
        bgColor = "#ff8000"; // Orange for modifications
        statusTranslation = "Complet";
        break;
      case RequestStatusEnum.Constitue:
        bgColor = "#007bff"; // Orange for modifications
        statusTranslation = "Constitué";
        break;
      case RequestStatusEnum.Cree:
        bgColor = "#396EA5"; // Orange for modifications
        statusTranslation = "Créé";
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
  const ReqAction = (props: any) => (
    <div className="flex gap-1 justify-end">
      <Link
        href={routes.patientRequest(props.patientId, props.requestId)}
        className="flex justify-center items-center"
      >
        <FaRegEye size={33} style={{ color: "#396EA5" }} />
      </Link>
      {/*<Link
        href={routes.patientRequests(props.patientId)}
        className="flex justify-center items-center"
      >
        <LuFileEdit size={25} style={{ color: "#396EA5" }} />
      </Link>*/}
    </div>
  );
  const reqGrid = [
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
      template: Status,
    },
    {
      headerText: "Actions",
      width: "40",
      template: ReqAction,
      textAlign: "start",
    },
  ];
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header
        category="Demandes"
        title={`Liste des Demandes : ${data.lastName + " " + data.firstName}`}
      />

      <GridComponent
        dataSource={data.requests.map((e) => {
          const status = e.statuses.find((e) => e.current);
          return {
            requestId: e.id,
            patientId: e.patientId,
            number: e.number.toString(),
            name: data.lastName + " " + data.firstName,
            date: e.createdAt,
            remark: status?.remark,
            documentCount: e.statuses.reduce(
              (a, b) => a + b._count.documents,
              0
            ),
            status: status?.status,
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
          {reqGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Search, Page, Selection, Toolbar, Edit, Sort, Filter]}
        />
      </GridComponent>

      {/*<Link href={`./requests/add-request`} className="text-[#396EA5] mt-5">
        Créer une nouvelle demande
      </Link>*/}
      <AddReqPopUp />
    </div>
  );
};
export default RequestListPatient;
