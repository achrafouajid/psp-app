"use client";
import React, { use, useId, useRef } from "react";
import { GoDotFill } from "react-icons/go";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip,
  ScrollBar,
  DataLabel,
  LineSeries,
} from "@syncfusion/ej2-react-charts";

import { Pie, SparkLine } from "@/components/charts";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/Contexts/ThemeContext";
import { FaFilePdf, FaMapMarkerAlt, FaUserInjured } from "react-icons/fa";
import getPatientCount from "../../../../server/patient/getPatientCount";
import getRequestCount from "../../../../server/patient/requests/getRequestCount";
import { FiFileText } from "react-icons/fi";
import { BsClipboard2Pulse } from "react-icons/bs";
import {
  LuFolderArchive,
  LuFolderCheck,
  LuFolderClock,
  LuFolderX,
} from "react-icons/lu";
import { downloadElementAsImage } from "@/app/api/htmlcanvas/htmlcanvas";
import getAllRegions from "../../../../server/region/getAllRegions";
import getAllDoctors from "../../../../server/doctor/getAllDoctors";
import calculateAverageCompletionTime from "../../../../server/patient/requests/AvgCompReq";
import dynamic from "next/dynamic";
import calculateAverageResponseTime from "../../../../server/patient/requests/AvgResRequest";
import CompResStacked from "@/components/charts/CompResStacked";
import NewPatientsStacked from "@/components/charts/NewPatientsStacked";
import DocWorkLoadStacked from "@/components/charts/DocWorkLoadStacked";
import PatientCallTable from "@/components/PatientCallTable";
import { getAllCallPatients } from "../../../../server/patient/getAllCallPatients";
import { getNewPatientsCountByMonth } from "../../../../server/patient/newPatientsCount";
import doctorWorkload from "../../../../server/doctor/doctorWorkLoad";

const LineChart = dynamic(() => import("@/components/charts/LineChart"), {
  ssr: false,
});
{
  /*const DropDown = ({ currentMode }: any) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" ? "white" : "" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);*/
}

const Home = ({
  data,
  data2,
  constitue,
  complete,
  attente,
  regions,
  accepte,
  refuse,
  cree,
  doctors,
  docpatients,
  avg,
  avg2,
  callpatients,
  newpatientsmonth,
}: {
  data: Awaited<ReturnType<typeof getPatientCount>>;
  data2: Awaited<ReturnType<typeof getRequestCount>>;
  regions: Awaited<ReturnType<typeof getAllRegions>>;
  constitue: number;
  complete: number;
  attente: number;
  accepte: number;
  refuse: number;
  cree: number;
  doctors: number;
  docpatients: Awaited<ReturnType<typeof doctorWorkload>>;
  avg: Awaited<ReturnType<typeof calculateAverageCompletionTime>>;
  avg2: Awaited<ReturnType<typeof calculateAverageResponseTime>>;
  callpatients: Awaited<ReturnType<typeof getAllCallPatients>>;
  newpatientsmonth: Awaited<ReturnType<typeof getNewPatientsCountByMonth>>;
}) => {
  const { currentColor, currentMode } = useStateContext();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const demandes = [
    {
      icon: <BsClipboard2Pulse />,
      amount: data2,
      title: "Demandes Totales traitées",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
    },
    {
      icon: <LuFolderCheck />,
      amount: constitue,
      title: "Dossiers Constitués",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
    },
    {
      icon: <LuFolderArchive />,
      amount: attente,
      title: "Dossiers Complets",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",
    },
    {
      icon: <LuFolderClock />,
      amount: attente,
      title: "Dossiers en Attente",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
    },
  ];
  const SparklineAreaData = [
    { x: 2023, yval: 0 },
    { x: 2024, yval: data },
    { x: 2025, yval: 0 },
    { x: 2026, yval: 0 },
    { x: 2027, yval: 0 },
  ];
  const SparklineAreaData2 = [
    { x: 2023, yval: 0 },
    { x: 2024, yval: doctors },
    { x: 2025, yval: 0 },
    { x: 2026, yval: 0 },
    { x: 2027, yval: 0 },
  ];
  const ecomPieChartData = [
    { x: "Complets", y: attente, text: "33%" },
    { x: "Constitués", y: constitue, text: "33%" },
    { x: "Créé", y: cree, text: "33%" },
    { x: "Attente", y: attente, text: "33%" },
  ];
  const PieChartData = [
    { x: "Casa Sud", y: 55, text: "33%" },
    { x: "Fes Orientale", y: 25, text: "33%" },
    { x: "Rabat Nord", y: 35, text: "33%" },
  ];
  const recentTransactions = [
    {
      icon: <LuFolderCheck />,
      amount: accepte,
      title: "Dossiers Acceptés",
      desc: "",
      iconBg: "#E5FAFB",
      pcColor: "green-600",
    },
    {
      icon: <LuFolderX />,
      amount: refuse,
      desc: "",
      title: "Dossiers refusés",
      iconBg: "rgb(235, 250, 242)",
      pcColor: "red-600",
    },
  ];

  const region: { name: string; count: number }[] = regions.flatMap((r) => ({
    name: r.name,
    count: r.city
      .flatMap((c) => c.doctors)
      .flatMap((e) => e._count.Patient)
      .reduce((a, b) => a + b, 0),
  }));

  return (
    <div className="" ref={ref}>
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div
          className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl border w-full lg:w-80 p-8 pt-9 m-3  bg-no-repeat bg-cover bg-center"
          style={{ borderColor: currentColor }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Total des patients</p>
              <p className="text-2xl">{data}</p>
            </div>
            <button
              onClick={() => {
                router.push("/patients");
              }}
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <FaUserInjured />
            </button>
          </div>
          <div className="mt-6">
            <Button
              onClick={() => {
                router.push("/patients");
              }}
              color="white"
              bgColor={currentColor}
              text="Visualiser"
              borderRadius="10px"
            />
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {demandes.map((item) => (
            <div
              key={item.title}
              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl border"
              style={{ borderColor: currentColor }}
            >
              <button
                type="button"
                style={{ color: currentColor, borderColor: currentColor }}
                className="text-2xl opacity-0.9 rounded-full border  p-4 hover:drop-shadow-xl dark:bg-white"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
              </p>
              <p className="text-sm text-gray-400 dark:text-white font-semibold mt-1">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div
          className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  m-3 p-4 rounded-2xl border md:w-780  "
          style={{ borderColor: currentColor }}
        >
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Nouveaux patients par mois</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-[#396EA5] hover:drop-shadow-xl">
                <span>
                  <GoDotFill />
                </span>
                <span>Patients</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <NewPatientsStacked newpatientsmonth={newpatientsmonth} />
          </div>
        </div>
        <div>
          <div
            className=" rounded-2xl md:w-400 p-4 m-3 border border-white"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">
                Patients annuels
              </p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">{data}</p>
                <p className="text-gray-200">cette année</p>
              </div>
            </div>

            <div className="mt-4">
              <SparkLine
                currentColor={currentColor}
                id="column-sparkLine"
                height="100px"
                type="Column"
                data={SparklineAreaData}
                width="320"
                color="rgb(242, 252, 253)"
              />
            </div>
          </div>

          <div
            className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg border rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10"
            style={{ borderColor: currentColor }}
          >
            <p
              className="text-xl font-semibold"
              style={{ color: currentColor }}
            >
              Distribution Dossiers :
            </p>

            <div className="w-40">
              <Pie
                id="pie-chart2"
                data={ecomPieChartData}
                legendVisiblity={true}
                height="160px"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-4 mb-4 gap-4 flex-wrap justify-center">
        <div
          className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl border"
          style={{ borderColor: currentColor }}
        >
          <div className="flex justify-between items-center gap-2">
            <p className="text-xl font-semibold">Dossiers</p>
            {/*<DropDown currentMode={currentMode} />*/}
          </div>
          <div className="mt-10 w-72 md:w-400">
            {recentTransactions.map((item) => (
              <div key={item.title} className="flex justify-between mt-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{
                      color: currentColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                  >
                    {item.icon}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
                <p className={`text-${item.pcColor}`}>{item.amount}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            <div className="mt-3">
              <Button
                onClick={() => {
                  router.push("/patients");
                }}
                icon={<FiFileText />}
                color="white"
                bgColor={currentColor}
                text="+ Demande"
                borderRadius="10px"
              />
            </div>
          </div>
        </div>

        <div
          className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl border"
          style={{ borderColor: currentColor }}
        >
          <div className=" m-4 pr-10">
            <div>
              <p>
                <span className="text-3xl font-semibold">{data}</span>
              </p>
              <p className="text-gray-500 mt-1">Patients ce mois</p>
            </div>
            <div className="mt-8">
              <p className="text-3xl font-semibold">{data2}</p>

              <p className="text-gray-500 mt-1">Demandes ce mois</p>
            </div>

            <div className="mt-10">
              <Button
                onClick={() => {
                  downloadElementAsImage(ref.current!);
                }}
                color="white"
                icon={<FaFilePdf />}
                bgColor={currentColor}
                text="Télécharger Rapport"
                borderRadius="10px"
              />
            </div>
          </div>
        </div>
        <div
          className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl border"
          style={{ borderColor: currentColor }}
        >
          <div className="flex justify-between items-center gap-2">
            <p className="text-xl font-semibold">Patients par région</p>
            {/*<DropDown currentMode={currentMode} />*/}
          </div>
          <div className="mt-10 w-72 md:w-400">
            {region.map((item) => (
              <div key={item.name} className="flex justify-between mt-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{
                      color: currentColor,
                    }}
                    className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                  >
                    <FaMapMarkerAlt />
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-400"></p>
                  </div>
                </div>
                <p className={``}>{item.count}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            <div className="mt-3">
              <Button
                onClick={() => {
                  router.push("/regions");
                }}
                icon={<FiFileText />}
                color="white"
                bgColor={currentColor}
                text="+ Région/Ville"
                borderRadius="10px"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-10 flex-wrap justify-center">
        <div>
          <div
            className=" rounded-2xl md:w-400 p-4 m-3 border border-white"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">
                Médecins sur la plateforme
              </p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">
                  {doctors}
                </p>
                <p className="text-gray-200">cette année</p>
              </div>
            </div>

            <div className="mt-4">
              <SparkLine
                currentColor={currentColor}
                id="column-sparkLine2"
                height="100px"
                type="Column"
                data={SparklineAreaData2}
                width="320"
                color="rgb(242, 252, 253)"
              />
            </div>
          </div>

          <div
            className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg border rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10"
            style={{ borderColor: currentColor }}
          >
            <p
              className="text-xl font-semibold"
              style={{ color: currentColor }}
            >
              Distribution Patients par région:
            </p>

            <div className="w-40">
              <Pie
                id="pie-chart"
                data={PieChartData}
                legendVisiblity={true}
                height="200px"
              />
            </div>
          </div>
        </div>
        <div
          className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  m-3 p-4 rounded-2xl border md:w-780  "
          style={{ borderColor: currentColor }}
        >
          <div className="flex justify-between">
            <p className="font-semibold text-xl">
              Charge de travail de chaque médecin
            </p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-[#396EA5] hover:drop-shadow-xl">
                <span>
                  <GoDotFill />
                </span>
                <span>Patients suivis</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className="">
              <DocWorkLoadStacked docpatients={docpatients} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-10 flex-wrap justify-center">
        <div
          className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  m-3 p-4 rounded-2xl border md:w-780  "
          style={{ borderColor: currentColor }}
        >
          <div className="flex justify-between">
            <p className="font-semibold text-xl">
              Temps de préparation et réponse de dossier
            </p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-[#00BDAE] hover:drop-shadow-xl">
                <span>
                  <GoDotFill />
                </span>
                <span>Préparation</span>
              </p>
              <p className="flex items-center gap-2 text-black hover:drop-shadow-xl">
                <span>
                  <GoDotFill />
                </span>
                <span>Réponse</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <CompResStacked avg={avg} avg2={avg2} />
          </div>
        </div>
        <div>
          <div
            className=" rounded-2xl md:w-400 p-4 m-3 border border-white"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">
                Nombre de patients à rappeler
              </p>

              <p className="text-2xl text-white font-semibold mt-8">
                {callpatients.length}
              </p>
            </div>
          </div>

          <div
            className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg border rounded-2xl md:w-400  m-3 flex justify-center items-center gap-10
            "
            style={{ borderColor: currentColor }}
          >
            <PatientCallTable callpatients={callpatients} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
