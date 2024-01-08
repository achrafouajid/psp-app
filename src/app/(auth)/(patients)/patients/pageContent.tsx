"use client";
import React from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";

import { employeesGrid } from "@/data/patientsData";
import Header from "@/components/Header";
import getAllPatients from "../../../../../server/patient/getAllpatients";

const PageContent = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getAllPatients>>;
}) => {
  const toolbarOptions = ["Search"];

  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Patients" title="Liste des patients" />
      <GridComponent
        dataSource={data.map((e) => ({
          notes: e.notes,
          program: e.program,
          birthDate: e.birthDate,
          avatar: e.image?.url,
          address: e.address ?? "-",
          name: e.lastName.concat(" ", e.firstName),
          id: e.id,
        }))}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{
          pageSize: 3,
        }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};
export default PageContent;
