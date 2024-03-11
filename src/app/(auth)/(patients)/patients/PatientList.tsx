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
import { LiaUserInjuredSolid } from "react-icons/lia";
import { employeesGrid } from "@/data/patientsData";
import getAllPatients from "../../../../../server/patient/getAllpatients";
import { Selection } from "@syncfusion/ej2-react-charts";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/Contexts/ThemeContext";

const PatientList = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getAllPatients>>;
}) => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete", "Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const { currentColor, currentMode } = useStateContext();
  const router = useRouter();

  return (
    <>
      <GridComponent
        dataSource={data.map((e) => ({
          tel: e.tel,
          patientno: e.patientno,
          notes: e.notes,
          program: e.program,
          birthDate: e.birthDate,
          avatar: e.image?.url,
          address: e.address ?? "-",
          name: e.lastName.concat(" ", e.firstName),
          id: e.id,
          requests: e.requests.length,
          doctor: e.doctor?.firstName.concat(" ", e.doctor?.lastName),
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
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Search, Page, Selection, Toolbar, Edit, Sort, Filter]}
        />
      </GridComponent>
      <div className="mt-5 flex justify-between">
        <Button
          onClick={() => {
            router.push("/add-patient");
          }}
          color="white"
          icon={<LiaUserInjuredSolid />}
          bgColor={currentColor}
          text="+ Patient"
          borderRadius="10px"
        />
      </div>
    </>
  );
};
export default PatientList;
