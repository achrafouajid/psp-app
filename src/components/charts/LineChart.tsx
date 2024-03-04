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
import { avgRespo2 } from "../../../server/patient/requests/AvgResRequest";
const LineChart = ({ avg, avg2 }: { avg: avgRespo; avg2: avgRespo2 }) => {
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
    const completionData = [];
    const responseData = [];

    for (let month = 0; month < 12; month++) {
      const completionTime = Math.ceil(
        (avg.find((e) => e.month === month + 1)?.avgCompletionTime ?? 0) /
          secInDay
      );
      const responseTime = Math.ceil(
        (avg2.find((e) => e.month === month + 1)?.avgResponseTime ?? 0) /
          secInDay
      );

      completionData.push({
        x: new Date(2024, month, 1),
        y: completionTime,
      });

      responseData.push({
        x: new Date(2024, month, 1),
        y: responseTime,
      });
    }

    return [completionData, responseData];
  }, [avg, avg2]);

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
