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
  ColumnSeries,
  LineSeries,
  DataLabel,
} from "@syncfusion/ej2-react-charts";
import { useStateContext } from "@/Contexts/ThemeContext";
import React, { useMemo } from "react";
import { avgRespo } from "../../../server/patient/requests/AvgCompReq";
import { avgRespo2 } from "../../../server/patient/requests/AvgResRequest";

export default function CompResStackedTwo({
  avg,
  avg2,
  avg3,
}: {
  avg: avgRespo;
  avg2: avgRespo2;
  avg3: avgRespo;
}) {
  const primaryxAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    intervalType: "Months",
    lineStyle: { width: 0 },
    labelIntersectAction: "Rotate90",
    labelFormat: "MMM",
    valueType: "DateTime",
  };

  const primaryyAxis = {
    lineStyle: { width: 0 },
    minimum: 0,
    maximum: 42,
    interval: 7,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: "{value}jrs",
  };
  const secInDay = 60 * 60 * 24;

  const data = useMemo(() => {
    const formattedData = [];

    for (let month = 0; month < 12; month++) {
      const completionTime = Math.ceil(
        (avg.find((e) => e.month === month + 1)?.avgCompletionTime ?? 0) /
          secInDay
      );
      const responseTime = Math.ceil(
        (avg3.find((e) => e.month === month + 1)?.avgCompletionTime ?? 0) /
          secInDay
      );

      formattedData.push({
        month: new Date(2024, month, 1), // Use Date object for the month
        avgCompletionTime: completionTime,
        avgResponseTime: responseTime,
      });
    }

    return formattedData;
  }, [avg, avg3]);

  return (
    <ChartComponent
      id="comp-res-stacked-2"
      primaryXAxis={primaryxAxis as any}
      primaryYAxis={primaryyAxis}
      tooltip={{ enable: true }}
    >
      <Inject
        services={[
          ColumnSeries,
          Legend,
          Tooltip,
          DataLabel,
          LineSeries,
          Category,
          ScrollBar,
          DateTime,
        ]}
      />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data}
          xName="month"
          yName="avgCompletionTime"
          name="Temps de Préparation"
          type="Column"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data}
          xName="month"
          yName="avgResponseTime"
          name="Temps de Réponse"
          type="Column"
        ></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}
