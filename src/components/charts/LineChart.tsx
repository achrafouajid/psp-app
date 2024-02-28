import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  DateTime,
  Legend,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

import { useStateContext } from "@/Contexts/ThemeContext";
import { avgRespo } from "../../../server/patient/requests/AvgCompReq";
import convertSecondsToDaysHoursMinutes from "../../../server/patient/requests/timeConvert";
import convertToDays from "../../../server/patient/requests/toDays";

const LineChart = ({ avg }: { avg: avgRespo }) => {
  const LinePrimaryXAxis = {
    valueType: "DateTime",
    labelFormat: "MMM",
    intervalType: "Months",
    edgeLabelPlacement: "Shift",
    majorGridLines: { width: 0 },
    background: "white",
  };

  const LinePrimaryYAxis = {
    labelFormat: "{value}jrs",
    valueType: "Double",
    rangePadding: "None",
    minimum: 0,
    maximum: 31,
    interval: 7,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
  };

  const lineChartData = [
    [
      {
        x: new Date(2024, 0, 1),
        y: convertToDays(
          avg.find((e) => e.month === 1)?.avgCompletionTime ?? 0
        ),
      },
      {
        x: new Date(2024, 1, 1),
        y: convertToDays(
          avg.find((e) => e.month === 2)?.avgCompletionTime ?? 0
        ),
      },
      {
        x: new Date(2024, 2, 1),
        y: avg.find((e) => e.month === 3)?.avgCompletionTime ?? 0,
      },
      {
        x: new Date(2024, 3, 1),
        y: avg.find((e) => e.month === 4)?.avgCompletionTime ?? 0,
      },
      {
        x: new Date(2024, 4, 1),
        y: avg.find((e) => e.month === 5)?.avgCompletionTime ?? 0,
      },
      {
        x: new Date(2024, 5, 1),
        y: avg.find((e) => e.month === 6)?.avgCompletionTime ?? 0,
      },
      {
        x: new Date(2024, 6, 1),
        y: avg.find((e) => e.month === 7)?.avgCompletionTime ?? 0,
      },
      {
        x: new Date(2024, 7, 1),
        y: avg.find((e) => e.month === 8)?.avgCompletionTime ?? 0,
      },
      {
        x: new Date(2024, 8, 1),
        y: avg.find((e) => e.month === 9)?.avgCompletionTime ?? 0,
      },
      {
        x: new Date(2024, 9, 1),
        y: avg.find((e) => e.month === 10)?.avgCompletionTime ?? 0,
      },
      {
        x: new Date(2024, 10, 1),
        y: avg.find((e) => e.month === 11)?.avgCompletionTime ?? 0,
      },
      {
        x: new Date(2024, 11, 1),
        y: avg.find((e) => e.month === 12)?.avgCompletionTime ?? 0,
      },
    ],
    [
      { x: new Date(2024, 0, 1), y: 28 },
      { x: new Date(2024, 1, 1), y: 44 },
      { x: new Date(2024, 2, 1), y: 48 },
      { x: new Date(2024, 3, 1), y: 50 },
      { x: new Date(2024, 4, 1), y: 66 },
      { x: new Date(2024, 5, 1), y: 78 },
      { x: new Date(2024, 6, 1), y: 84 },
      { x: new Date(2024, 7, 1), y: 45 },
      { x: new Date(2024, 8, 1), y: 65 },
      { x: new Date(2024, 9, 1), y: 90 },
      { x: new Date(2024, 10, 1), y: 50 },
      { x: new Date(2024, 11, 1), y: 30 },
    ],
  ];

  const lineCustomSeries = [
    {
      dataSource: lineChartData[0],
      xName: "x",
      yName: "y",
      name: "Completion",
      width: "1",
      marker: { visible: true, width: 10, height: 10 },
      type: "Line",
    },

    {
      dataSource: lineChartData[1],
      xName: "x",
      yName: "y",
      name: "Réponse",
      width: "2",
      marker: { visible: true, width: 10, height: 10 },
      type: "Line",
    },
  ];
  const { currentMode } = useStateContext();
  console.log("TEST");
  console.log(
    convertToDays(avg.find((e) => e.month === 2)?.avgCompletionTime ?? 0)
  );
  console.log("TEST");
  return (
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={LinePrimaryXAxis as any}
      primaryYAxis={LinePrimaryYAxis as any}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
      legendSettings={{ background: "white" }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {lineCustomSeries.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
