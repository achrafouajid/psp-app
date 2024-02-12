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
import getPatientRequests from "../../../../../../../server/patient/requests/get_patient_requests";
import Link from "next/link";
import AddReqPopUp from "./AddReqPopUp";

const RequestListPatient = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getPatientRequests>>;
}) => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete", "Search"];
  const editing = { allowDeleting: true, allowEditing: true };

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
      <AddReqPopUp />
    </div>
  );
};
export default RequestListPatient;
