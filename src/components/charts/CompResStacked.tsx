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
import { useStateContext } from "@/Contexts/ThemeContext";
import React, { useMemo } from "react";
import { avgRespo } from "../../../server/patient/requests/AvgCompReq";
import { avgRespo2 } from "../../../server/patient/requests/AvgResRequest";

export default function CompResStacked({
  avg,
  avg2,
}: {
  avg: avgRespo;
  avg2: avgRespo2;
}) {
  const { currentMode } = useStateContext();

  const stackedCompResXAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    intervalType: "Months",
    lineStyle: { width: 0 },
    labelIntersectAction: "Rotate45",
    valueType: "DateTime",
    labelFormat: "MMM",
  };

  const stackedCompResYAxis = {
    lineStyle: { width: 0 },
    minimum: 0,
    maximum: 31,
    interval: 7,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: "{value}jrs",
  };
  const secInDay = 60 * 60 * 24;
  const stackedCompResData = useMemo(() => {
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

  const stackedCompResSeries = [
    {
      dataSource: stackedCompResData[0],
      xName: "x",
      yName: "y",
      name: "Préparation",
      width: "1",
      marker: { visible: true, width: 10, height: 10 },
      type: "StackingColumn",
      background: "blue",
    },

    {
      dataSource: stackedCompResData[1],
      xName: "x",
      yName: "y",
      name: "Réponse",
      width: "2",
      marker: { visible: true, width: 10, height: 10 },
      type: "StackingColumn",
      background: "red",
    },
  ];

  return (
    <ChartComponent
      id="comp-res-stacked"
      primaryXAxis={stackedCompResXAxis as any}
      primaryYAxis={stackedCompResYAxis}
      height="420"
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
      legendSettings={{ background: "white" }}
    >
      <Inject
        services={[
          StackingColumnSeries,
          DateTime,
          Category,
          Legend,
          Tooltip,
          ScrollBar,
        ]}
      />
      <SeriesCollectionDirective>
        {stackedCompResSeries.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}
