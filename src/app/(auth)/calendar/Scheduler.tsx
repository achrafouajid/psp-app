import * as React from "react";
import { useState } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { scheduleData } from "@/data/dummy";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

const PropertyPane = (props: { children?: React.ReactNode }) => (
  <div className="mt-5">{props.children}</div>
);

const Scheduler = () => {
  const [scheduleObj, setScheduleObj] = useState(undefined);

  const change = (args: { value: Date }) => {
    /* @ts-ignore */
    scheduleObj!.selectedDate = args.value;
    /* @ts-ignore */
    scheduleObj!.dataBind();
  };

  const onDragStart = (arg: { navigation: { enable: boolean } }) => {
    arg.navigation.enable = true;
  };
  return (
    <>
      <ScheduleComponent
        height="650px"
        /* @ts-ignore */
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={new Date(2021, 0, 10)}
        eventSettings={{ dataSource: scheduleData }}
        dragStart={onDragStart}
      >
        <ViewsDirective>
          {["Day", "Week", "WorkWeek", "Month", "Agenda"].map((item) => (
            /* @ts-ignore */
            <ViewDirective key={item} option={item} />
          ))}
        </ViewsDirective>
        <Inject
          services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
        />
      </ScheduleComponent>
      <PropertyPane>
        <table style={{ width: "100%", background: "white" }}>
          <tbody>
            <tr style={{ height: "50px" }}>
              <td style={{ width: "100%" }}>
                <DatePickerComponent
                  value={new Date(2021, 0, 10)}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </>
  );
};
export default Scheduler;
