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

import Header from "@/components/Header";
import getAllUsers from "../../../../server/auth/getAllUsers";
import { gridProfile } from "@/data/patientsData";
import { CiSettings } from "react-icons/ci";
import Link from "next/link";
const gridUserProfile = (props: any) => (
  <Link href={`/users/${props.id}`}>
    <CiSettings />
  </Link>
);
const usersGrid = [
  { type: "checkbox", width: "50" },
  {
    headerText: "",
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
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete", "Search"];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Dashboard" title="Gestion Utilisateurs" />
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
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {usersGrid.map((item, index) => (
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

export default UsersData;
