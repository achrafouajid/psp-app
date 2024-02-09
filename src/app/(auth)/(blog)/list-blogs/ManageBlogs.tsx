"use client";
import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";

import { contextMenuItems } from "@/data/dummy";
import get_blogs from "../../../../../server/blog/get_blogs";

export default function ManageBlogs(props: {
  data: Awaited<ReturnType<typeof get_blogs>>;
}) {
  const editing = { allowDeleting: true, allowEditing: true };
  const gridOrderStatus = (props: any) => (
    <button
      type="button"
      style={{ background: props.StatusBg }}
      className="text-white py-1 px-2 capitalize rounded-2xl text-md"
    >
      {props.Status}
    </button>
  );
  const gridOrderImage = (props: any) => (
    <div>
      <img
        className="rounded-xl h-20 md:ml-3"
        src="test.jpeg"
        alt="order-item"
      />
    </div>
  );
  const ordersGrid = [
    {
      headerText: "Image",
      template: gridOrderImage,
      textAlign: "Center",
      width: "120",
    },
    {
      field: "OrderItems",
      headerText: "Nom Article",
      width: "150",
      editType: "dropdownedit",
      textAlign: "Center",
    },
    {
      field: "CustomerName",
      headerText: "Nom Auteur",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "TotalAmount",
      headerText: "Catégories",
      format: "C2",
      textAlign: "Center",
      editType: "numericedit",
      width: "150",
    },
    {
      headerText: "Status",
      template: gridOrderStatus,
      field: "OrderItems",
      textAlign: "Center",
      width: "120",
    },
    {
      field: "OrderID",
      headerText: "ID",
      width: "120",
      textAlign: "Center",
    },

    {
      field: "Location",
      headerText: "Notes",
      width: "150",
      textAlign: "Center",
    },
  ];
  const ordersData = [
    {
      ID: 1,
      CustomerName: "Admin test",
      TotalAmount: "Oncologie",
      OrderItems: "test blog",
      Location: "USA",
      Status: "Actif",
      StatusBg: "#396EA5",
    },
    {
      ID: 2,
      CustomerName: "Admin test",
      TotalAmount: "Oncologie",
      OrderItems: "test blog",
      Location: "USA",
      Status: "Actif",
      StatusBg: "#396EA5",
    },
    {
      ID: 3,
      CustomerName: "Admin test",
      TotalAmount: "Oncologie",
      OrderItems: "test blog",
      Location: "USA",
      Status: "Actif",
      StatusBg: "#396EA5",
    },
  ];
  return (
    <GridComponent
      id="gridcomp"
      dataSource={ordersData}
      allowPaging
      allowSorting
      allowExcelExport
      allowPdfExport
      contextMenuItems={contextMenuItems}
      editSettings={editing}
    >
      <ColumnsDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {ordersGrid.map((item, index) => (
          <ColumnDirective key={index} {...item} />
        ))}
      </ColumnsDirective>
      {/*props.data.map((item, index) =>
      )*/}
      <Inject
        services={[
          Resize,
          Sort,
          ContextMenu,
          Filter,
          Page,
          ExcelExport,
          Edit,
          PdfExport,
        ]}
      />
    </GridComponent>
  );
}
