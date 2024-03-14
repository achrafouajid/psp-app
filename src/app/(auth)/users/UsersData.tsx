"use client";
import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Search,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";

import getAllUsers from "../../../../server/auth/getAllUsers";
import { CiSettings } from "react-icons/ci";
import Link from "next/link";
import { UserRole, UserStatus } from "@prisma/client";
import { Avatar, Chip } from "@nextui-org/react";
const Status = (props: any) => {
  let bgColor = ""; // Default color
  let statusTranslation = "";
  switch (props.status) {
    case UserStatus.Active:
      bgColor = "#4CAF50"; // Green for success
      statusTranslation = "Actif";
      break;
    case UserStatus.NeedInitialization:
      bgColor = "#f7cb73"; // Yelllow for pending
      statusTranslation = "Inactif";
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
const Role = (props: any) => {
  let bgColor = ""; // Default color
  let roleTranslation = "";
  switch (props.role) {
    case UserRole.Admin:
      bgColor = "#396EA5"; // Green for success
      roleTranslation = "Administrateur";
      break;
    case UserRole.Lab:
      bgColor = "#f7cb73"; // Yelllow for pending
      roleTranslation = "Laboratoire";
      break;
    case UserRole.Nurse:
      bgColor = "#4CAF50"; // Red for expired
      roleTranslation = "Infirmière";
      break;
    case UserRole.Patient:
      bgColor = "#F44336"; // Orange for modifications
      roleTranslation = "Patient";
      break;

    default:
      bgColor = "#f7cb73"; // Default color if status is not recognized
      roleTranslation = props.role;
      return { role: roleTranslation, bgColor };
  }

  return (
    <Chip size="lg" style={{ backgroundColor: bgColor, color: "white" }}>
      {props.roleTranslation || roleTranslation}
    </Chip>
  );
};
const gridUserProfile = (props: any) => (
  <Link href={`/${props.id}`}>
    <CiSettings size={33} style={{ color: "#396EA5" }} />
  </Link>
);

const gridProfile = (props: any) => {
  let avatarColor:
    | "primary"
    | "default"
    | "success"
    | "danger"
    | "warning"
    | "secondary"
    | undefined = "primary"; // Default color
  switch (props.role) {
    case UserRole.Admin:
      avatarColor = "primary"; // Green for success
      break;
    case UserRole.Lab:
      avatarColor = "warning"; // Assuming "primary" is the closest match for yellow
      break;
    case UserRole.Nurse:
      avatarColor = "success"; // Red for expired
      break;
    case UserRole.Patient:
      avatarColor = "danger"; // Orange for modifications
      break;
    default:
      avatarColor = "primary"; // Default color if status is not recognized
      break;
  }

  return props.avatar ? (
    <Avatar isBordered color={avatarColor} src={`${props.avatar?.url}`} />
  ) : (
    <Avatar name={props.name} color={avatarColor} />
  );
};

const usersGrid = [
  {
    headerText: "Photo de Profil",
    field: "Avatar",
    width: "40px",
    template: gridProfile,
    textAlign: "Center",
  },
  {
    headerText: "Nom Complet",
    field: "Name",
    width: "150",
    template: "",
    textAlign: "Center",
  },
  {
    field: "Email",
    headerText: "Email",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "Status",
    headerText: "Statut",
    template: Status,
    width: "130",
    format: "yMd",
    textAlign: "Center",
  },
  {
    field: "Role",
    headerText: "Role",
    width: "100",
    format: "C2",
    textAlign: "Center",
    template: Role,
  },
  {
    headerText: "",
    width: "40px",
    template: gridUserProfile,
    textAlign: "Center",
  },
];

const UsersData = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getAllUsers>>;
}) => {
  const toolbarOptions = ["Search"];

  return (
    <GridComponent
      dataSource={data.map((e) => ({
        email: e.email,
        role: e.role,
        name: e.lastName.concat(" ", e.firstName),
        id: e.id,
        status: e.status,
        avatar: e.avatar,
      }))}
      enableHover={true}
      allowPaging
      pageSettings={{ pageSize: 5 }}
      toolbar={toolbarOptions}
      allowSorting
    >
      <ColumnsDirective>
        {usersGrid.map((item, index) => (
          <ColumnDirective key={index} {...item} />
        ))}
      </ColumnsDirective>
      <Inject services={[Search, Page, Toolbar, Sort, Filter]} />
    </GridComponent>
  );
};

export default UsersData;
