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
import Button from "@/components/Button";
import { FiFileText } from "react-icons/fi";
import { useStateContext } from "@/Contexts/ThemeContext";
import { useRouter } from "next/navigation";

const RequestList = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getAllRequests>>;
}) => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete", "Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const { currentColor } = useStateContext();
  const router = useRouter();

  return (
    <div>
      <GridComponent
        dataSource={data.map((e) => ({
          requestId: e.id,
          patientId: e.patientId,
          number: e.number.toString(),
          name: e.Patient.lastName.concat(" ", e.Patient.firstName),
          date: e.createdAt,
          remark: e.statuses.at(0)?.remark,
          documentCount: e._count.documents,
          status: e.statuses.at(0)?.status.toString(),
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
      <div className="mt-5">
        <Button
          onClick={() => {
            router.push("/patients");
          }}
          icon={<FiFileText />}
          color="white"
          bgColor={currentColor}
          text="+ Demande"
          borderRadius="10px"
        />
      </div>
    </div>
  );
};
export default RequestList;
