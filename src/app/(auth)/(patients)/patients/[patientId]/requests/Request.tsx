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

import { reqGrid } from "@/data/patientsData";
import Header from "@/components/Header";
import { Selection } from "@syncfusion/ej2-react-charts";
import getAllRequests from "../../../../../../../server/patient/requests/getAllRequests";
import Link from "next/link";

const Request = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getAllRequests>>;
}) => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete", "Search"];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Demandes"
        title={`Liste des Demandes ${data.lastName + " " + data.firstName}`}
      />

      <GridComponent
        dataSource={data.requests.map((e) => ({
          number: e.number.toString(),
          date: e.createdAt,
          remark: e.remark,
          documentCount: e._count.documents,
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
          {reqGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Search, Page, Selection, Toolbar, Edit, Sort, Filter]}
        />
      </GridComponent>

      <Link href={`./requests/add-request`} className="text-[#396EA5] mt-5">
        Créer une nouvelle demande
      </Link>
    </div>
  );
};
export default Request;
