"use client";
import React from "react";
import { useStateContext } from "@/Contexts/ThemeContext";
import getRequest from "../../../../../../../../../server/patient/requests/getRequest";
import Image from "next/image";

export default function StatusRequest({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof getRequest>>>;
}) {
  const { currentColor } = useStateContext();
  const currentStatus = data.statuses.find((e) => e.current);

  return (
    <>
      <div className="w-full mt-20">
        <div className="border rounded-md border-[#396EA5] bg-[#F5F9FE]">
          <div className="text-sm text-center text-[#396EA5] font-bold mx-5 mt-5">
            <p> Votre Dossier est Refusé .</p>
            <div className="flex justify-center">
              <Image
                src="/refused.gif"
                alt="loading"
                height={100}
                width={100}
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
