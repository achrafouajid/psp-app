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
import { Selection } from "@syncfusion/ej2-react-charts";
import getAllRequests from "../../../../../server/patient/requests/getAllRequests";

const RequestList = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getAllRequests>>;
}) => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete", "Search"];

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
