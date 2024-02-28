import React, { useMemo } from "react";
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
  const secInDay = 60 * 60 * 24;
  const lineChartData = useMemo(() => {
    const data = [];
    for (let month = 0; month < 12; month++) {
      data.push({
        x: new Date(2024, month, 1),
        y: Math.ceil(
          (avg.find((e) => e.month === month + 1)?.avgCompletionTime ?? 0) /
            secInDay
        ),
      });
    }
    return [
      data,
      [
        { x: new Date(2024, 0, 1), y: 1 },
        { x: new Date(2024, 1, 1), y: 2 },
        { x: new Date(2024, 2, 1), y: 0 },
        { x: new Date(2024, 3, 1), y: 0 },
        { x: new Date(2024, 4, 1), y: 0 },
        { x: new Date(2024, 5, 1), y: 0 },
        { x: new Date(2024, 6, 1), y: 0 },
        { x: new Date(2024, 7, 1), y: 0 },
        { x: new Date(2024, 8, 1), y: 0 },
        { x: new Date(2024, 9, 1), y: 0 },
        { x: new Date(2024, 10, 1), y: 0 },
        { x: new Date(2024, 11, 1), y: 0 },
      ],
    ];
  }, [avg]);

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
