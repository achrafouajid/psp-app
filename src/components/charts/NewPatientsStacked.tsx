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
import { getNewPatientsCountByMonth } from "../../../server/patient/newPatientsCount";

export default function NewPatientsStacked({
  newpatientsmonth,
}: {
  newpatientsmonth: Awaited<ReturnType<typeof getNewPatientsCountByMonth>>;
}) {
  const { currentColor, currentMode } = useStateContext();

  // Adjust the months array to include French month names

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const stackedChartData = months.map((month) => ({ x: month, y: 0 }));
  newpatientsmonth.forEach(({ month, count }) => {
    const numericMonth = Number(month);
    const monthName = months[numericMonth - 1];
    if (monthName) {
      const index = stackedChartData.findIndex((item) => item.x === monthName);
      if (index !== -1) {
        stackedChartData[index].y = Number(count);
      }
    }
  });
  const stackedCustomSeries = [
    {
      dataSource: stackedChartData,
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
    maximum: 20,
    interval: 100,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: "{value}",
  };
  return (
    <ChartComponent
      id="new-patients-stacked"
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
        {stackedCustomSeries.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}
