"use client";
import React, { useState } from "react";
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
import { Button, Chip } from "@nextui-org/react";
import { BlogStatusEnum } from "@prisma/client";
import remove_blog from "../../../../../server/blog/remove_blog";
import { LuDelete } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";

const BlogAction = (props: any) => {
  const router = useRouter();

  return (
    <div className="flex gap-1 justify-around">
      <Button
        onClick={() => {
          remove_blog(props.blogId);
        }}
        isIconOnly
        color="danger"
        variant="bordered"
      >
        <LuDelete size={25} style={{ color: "red" }} />
      </Button>

      <Button
        isIconOnly
        color="primary"
        variant="bordered"
        onClick={() => {
          router.push(`${props.blogId}/edit`);
        }}
      >
        <FaEdit size={25} style={{ color: "#396EA5" }} />
      </Button>
    </div>
  );
};
export default function ManageBlogs(props: {
  data: Awaited<ReturnType<typeof get_blogs>>;
}) {
  const blogStatus = (props: any) => {
    let bgColor = ""; // Default color
    switch (props.status) {
      case BlogStatusEnum.Publie:
        bgColor = "#4CAF50"; // Green for success
        break;
      case BlogStatusEnum.Attente:
        bgColor = "#f7cb73"; // Yelllow for pending
        break;
      case BlogStatusEnum.Refuse:
        bgColor = "#F44336"; // Red for refused
        break;
      case BlogStatusEnum.Modifications:
        bgColor = "#FFA000"; // Orange for modifications
        break;

      default:
        bgColor = "#f7cb73"; // Default color if status is not recognized
    }

    return (
      <Chip size="lg" style={{ backgroundColor: bgColor, color: "white" }}>
        {props.status}
      </Chip>
    );
  };
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
      field: "title",
      headerText: "Nom Article",
      width: "150",
      editType: "dropdownedit",
      textAlign: "Center",
    },
    {
      field: "author",
      headerText: "Nom Auteur",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "categories",
      headerText: "Catégories",
      format: "C2",
      textAlign: "Center",
      editType: "numericedit",
      width: "150",
    },
    {
      headerText: "Status",
      template: blogStatus,
      field: "status",
      textAlign: "Center",
      width: "120",
    },

    {
      field: "note",
      headerText: "Notes",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "date",
      headerText: "Date de publication",
      width: "150",
      textAlign: "Center",
    },
    {
      headerText: "Actions",
      width: "50",
      template: BlogAction,
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
      dataSource={props.data.map((e) => {
        return {
          blogId: e.id,
          image: e.image,
          title: e.title,
          categories: e.categories.map((e) => e.category).join(", ")
            ? e.categories
            : "aucune catégorie",
          author: e.author.firstName + " " + e.author.lastName,
          date: e.publishedAt.toLocaleString("fr", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          content: { dangerouslySetInnerHTML: { __html: e.content } },
          status: e.status,
          note: e.notes ? e.notes : "aucune note", // Use a ternary operator to handle empty notes
        };
      })}
      allowPaging
      allowSorting
      allowExcelExport
      allowPdfExport
      contextMenuItems={contextMenuItems}
    >
      <ColumnsDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {ordersGrid.map((item, index) => (
          <ColumnDirective key={index} {...item} />
        ))}
      </ColumnsDirective>
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
