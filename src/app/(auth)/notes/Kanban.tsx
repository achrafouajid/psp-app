"use client";
import React from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";

export default function Kanban() {
  const kanbanData = [
    {
      Id: "Task 1",
      Title: "Task - 29001",
      Status: "Open",
      Summary: "TEST rafiki fi Ilaji.",
      Type: "Story",
      Priority: "Low",
      Tags: "Analyze,Customer",
      Estimate: 3.5,
      Assignee: "Nancy Davloio",
      RankId: 1,
      Color: "#02897B",
      ClassName: "e-story, e-low, e-nancy-davloio",
    },
    {
      Id: "Task 2",
      Title: "Task - 29002",
      Status: "InProgress",
      Summary: "TEST rafiki fi Ilaji.",
      Type: "Improvement",
      Priority: "Normal",
      Tags: "Improvement",
      Estimate: 6,
      Assignee: "Andrew Fuller",
      RankId: 1,
      Color: "#673AB8",
      ClassName: "e-improvement, e-normal, e-andrew-fuller",
    },
    {
      Id: "Task 5",
      Title: "Task - 29005",
      Status: "Review",
      Summary: "Fix the issues reported by the customer.",
      Type: "Bug",
      Priority: "Low",
      Tags: "Customer",
      Estimate: "3.5",
      Assignee: "Steven walker",
      RankId: 1,
      Color: "#E64A19",
      ClassName: "e-bug, e-low, e-steven-walker",
    },
  ];
  const kanbanGrid = [
    { headerText: "A faire", keyField: "Open", allowToggle: true },

    { headerText: "En attente", keyField: "InProgress", allowToggle: true },

    {
      headerText: "Test",
      keyField: "Testing",
      allowToggle: true,
      isExpanded: false,
    },

    { headerText: "Achevé", keyField: "Close", allowToggle: true },
  ];
  return (
    <>
      <KanbanComponent
        id="kanban"
        keyField="Status"
        dataSource={kanbanData}
        cardSettings={{ contentField: "Summary", headerField: "Id" }}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {kanbanGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
      </KanbanComponent>
    </>
  );
}
