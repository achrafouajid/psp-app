import React from "react";
import {
  Inject,
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  StackingColumnSeries,
  Category,
  Legend,
  Tooltip,
  ScrollBar,
  DateTime,
} from "@syncfusion/ej2-react-charts";

import getPatientCount from "../../../server/patient/getPatientCount";
import getAllDoctors from "../../../server/doctor/getAllDoctors";
import { useStateContext } from "@/Contexts/ThemeContext";
import doctorWorkload from "../../../server/doctor/doctorWorkLoad";

export default function DocWorkLoadStacked({
  docpatients,
}: {
  docpatients: Awaited<ReturnType<typeof doctorWorkload>>;
}) {
  const { currentColor, currentMode } = useStateContext();

  const stackedData = [
    {
      dataSource: docpatients.map((e) => ({
        x: e.title + "." + e.lastName + " " + e.firstName,
        y: e._count.Patient,
      })),
      xName: "x",
      yName: "y",
      name: "Patients",
      type: "StackingColumn",
      background: "blue",
    },
  ];

  const stackedPrimaryXAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: "Rotate45",
    valueType: "Category",
    scrollbarSettings: {
      enableZoom: false,
      gripColor: "transparent",
      scrollbarColor: "#0ae",
      scrollbarRadius: 5,
      height: 10,
    },
  };

  const stackedPrimaryYAxis = {
    lineStyle: { width: 0 },
    minimum: 0,
    maximum: 50,
    interval: 10,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: "{value}",
  };
  return (
    <ChartComponent
      id="doc-workload-stacked"
      primaryXAxis={stackedPrimaryXAxis as any}
      primaryYAxis={stackedPrimaryYAxis}
      width="675"
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
    >
      <Inject
        services={[StackingColumnSeries, Category, Legend, Tooltip, ScrollBar]}
      />
      <SeriesCollectionDirective>
        {stackedData.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}
