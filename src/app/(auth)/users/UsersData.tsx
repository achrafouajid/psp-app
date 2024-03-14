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
const gridUserProfile = (props: any) => (
  <Link href={`/${props.id}`}>
    <CiSettings size={25} style={{ color: "#396EA5" }} />
  </Link>
);

const gridProfile = (props: any) =>
  props.avatar ? (
    <img
      className="rounded-full w-10 h-10"
      src={`${props.avatar?.url}`}
      alt="employee"
    />
  ) : (
    <div className="rounded-full w-10 h-10">{props.avatar?.url}</div>
  );
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
    headerText: "Status",
    width: "130",
    format: "yMd",
    textAlign: "Center",
    template: "",
  },
  {
    field: "Role",
    headerText: "Role",
    width: "100",
    format: "C2",
    textAlign: "Center",
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
