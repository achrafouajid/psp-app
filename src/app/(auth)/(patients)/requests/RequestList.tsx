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
import getAllRequests from "../../../../../server/patient/requests/getAllRequests";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa6";
import { routes } from "@/utils/routes";
import { RequestStatusEnum } from "@prisma/client";
import { Chip } from "@nextui-org/react";

const RequestList = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getAllRequests>>;
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
    <div>
      <GridComponent
        dataSource={data.map((e) => {
          const currentStatus = e.statuses.find((e) => e.current);
          return {
            requestId: e.id,
            patientId: e.patientId,
            number: e.number.toString(),
            name: e.Patient.lastName.concat(" ", e.Patient.firstName),
            date: e.createdAt,
            remark: currentStatus?.remark,
            documentCount: e.statuses.reduce(
              (acc, cur) => acc + cur._count.documents,
              0
            ),
            status: currentStatus?.status.toString(),
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
    </div>
  );
};
export default RequestList;
