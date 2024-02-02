"use client";
import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

import {
  earningData,
  medicalproBranding,
  recentTransactions,
  weeklyStats,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData,
} from "@/data/dummypatient";
import Button from "@/components/Button";
import { useStateContext } from "@/Contexts/ThemeContext";
import { GoDotFill } from "react-icons/go";
import { useSession } from "@/Contexts/UserContext";
import Image from "next/image";
import { FaFileDownload } from "react-icons/fa";
import Notifications from "../users/[userId]/(user)/notifications/Notifications";
const DropDown = ({ currentMode }: any) => (
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
);
export default function Welcome() {
  const { currentColor, currentMode } = useStateContext();
  const user = useSession();
  return (
    <div className="grid container mt-16 px-10 mx-auto gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ">
      <div
        className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl border"
        style={{ borderColor: currentColor }}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-gray-400">Bonjour,</p>
            <p className="text-2xl">
              {user.lastName} {user.firstName} !
            </p>
            <p className="text-gray-500 text-sm dark:text-gray-400">Visiteur</p>
            <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
              {user.email}
            </p>
          </div>

          <Image
            className="rounded-full h-24 w-24"
            src={user.avatar?.url ? "/" + user.avatar?.url : "/noavatar.png"}
            alt="user-avatar"
            width={200}
            height={200}
          />
        </div>
        <Button
          color="white"
          bgColor={currentColor}
          icon={<FaFileDownload />}
          text="Fiche"
          borderRadius="10px"
        />
      </div>

      <div
        className="bg-white dark:text-gray-200 xl:col-span-2 dark:bg-secondary-dark-bg p-6  rounded-2xl border"
        style={{ borderColor: currentColor }}
      >
        <Image
          className="h-24 w-24 rounded-full border "
          style={{ borderColor: currentColor }}
          src="/horloge.gif"
          alt="pending"
          width={2000}
          height={2000}
        />
        <p>
          Votre inscription sur la plateforme a bien été effectuée. Veuillez
          patienter pendant que l'administrateur système valide votre statut.
        </p>
      </div>
      <div
        className="bg-white col-span-1 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl border"
        style={{ borderColor: currentColor }}
      >
        <div className="flex justify-between items-center gap-2">
          <p className="text-xl font-semibold">Mes Demandes</p>
          <DropDown currentMode={currentMode} />
        </div>
        <div className="mt-10 w-72 md:w-400">
          {recentTransactions.map((item) => (
            <div key={item.title} className="flex justify-between mt-4">
              <div className="flex gap-4">
                <button
                  type="button"
                  style={{
                    color: item.iconColor,
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
              color="white"
              bgColor={currentColor}
              text="Consulter mes demandes"
              borderRadius="10px"
            />
          </div>

          <p className="text-gray-400 text-sm"> 10 Demandes</p>
        </div>
      </div>

      <div
        className="bg-white dark:text-gray-200 xl:col-span-2 dark:bg-secondary-dark-bg p-6  rounded-2xl border"
        style={{ borderColor: currentColor }}
      >
        <div className="flex justify-between items-center gap-2 mb-10">
          <p className="text-xl font-semibold">Notifications</p>
        </div>
        <Notifications />
      </div>

      <div
        className=" bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl border"
        style={{ borderColor: currentColor }}
      >
        <div className="flex justify-between">
          <p className="text-xl font-semibold">Mes Rendez-vous</p>
          <button type="button" className="text-xl font-semibold text-gray-500">
            <IoIosMore />
          </button>
        </div>

        <div className="mt-10 ">
          {weeklyStats.map((item) => (
            <div key={item.title} className="flex justify-between mt-4 w-full">
              <div className="flex gap-4">
                <button
                  type="button"
                  style={{ background: item.iconBg }}
                  className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
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
      </div>
      <div
        className=" bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  p-6 rounded-2xl border"
        style={{ borderColor: currentColor }}
      >
        <div className="flex justify-between">
          <p className="text-xl font-semibold">Prise Médicaments</p>
          <button type="button" className="text-xl font-semibold text-gray-400">
            <IoIosMore />
          </button>
        </div>
        <p className="text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-24 bg-orange-400 py-0.5 px-2 text-gray-200 mt-10">
          16 APR, 2021
        </p>

        <div className="flex gap-4 border-b-1 border-color mt-6">
          {medicalproBranding.data.map((item) => (
            <div key={item.title} className="border-r-1 border-color pr-4 pb-2">
              <p className="text-xs text-gray-400">{item.title}</p>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="border-b-1 border-color pb-4 mt-2">
          <p className="text-md font-semibold mb-2">Teams</p>

          <div className="flex gap-4">
            {medicalproBranding.teams.map((item) => (
              <p
                key={item.name}
                style={{ background: item.color }}
                className="cursor-pointer hover:drop-shadow-xl text-white py-0.5 px-3 rounded-lg text-xs"
              >
                {item.name}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-2">
          <p className="text-md font-semibold mb-2">Leaders</p>
          {/*    <div className="flex gap-4">
              {medicalproBranding.leaders.map((item, index) => (
                <img key={index} className="rounded-full w-8 h-8" src={item.image} alt="" />
              ))}
            </div> */}
        </div>
        <div className="flex justify-between items-center mt-5 border-t-1 border-color">
          <p className="text-gray-400 text-sm">36 Recent Transactions</p>
        </div>
      </div>

      <div
        className=" bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl border"
        style={{ borderColor: currentColor }}
      >
        <div className="flex justify-between">
          <p className="text-xl font-semibold">
            Dernier Module Education Patient
          </p>
          <button type="button" className="text-xl font-semibold text-gray-500">
            <IoIosMore />
          </button>
        </div>
        <div className="mt-10">
          <Image
            className="md:w-96 h-50 rounded-2xl"
            src="/rafiki.jpg"
            alt="rafi9i"
            width={200}
            height={200}
          />
          <div className="mt-8">
            <p className="font-semibold text-lg">Rafiki Fi Ilaji En ligne !</p>
            <p className="text-gray-400 ">By TEST Admin</p>
            <p className="mt-8 text-sm text-gray-400">
              This will be the small description for the news you have shown
              here. There could be some great info.
            </p>
            <div className="mt-3">
              <Button
                color="white"
                bgColor={currentColor}
                text="Read More"
                borderRadius="10px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
