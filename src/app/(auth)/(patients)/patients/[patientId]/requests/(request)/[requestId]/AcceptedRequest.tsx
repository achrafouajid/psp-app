"use client";
import React from "react";
import { useStateContext } from "@/Contexts/ThemeContext";
import getRequest from "../../../../../../../../../server/patient/requests/getRequest";
import Image from "next/image";
import StepperFour from "./StepperFour";

export default function StatusRequest({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof getRequest>>>;
}) {
  const { currentColor } = useStateContext();
  const currentStatus = data.statuses.find((e) => e.current);

  return (
    <>
      <StepperFour />
      <div className="w-full mt-20">
        <div className="border rounded-md border-[#396EA5] bg-[#F5F9FE]">
          <div className="text-sm text-center text-[#396EA5] font-bold mx-5 mt-5">
            <p> Votre Dossier est Accepté !</p>
            <div className="flex justify-center">
              <Image
                src="/check.png"
                alt="loading"
                height={250}
                width={250}
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
