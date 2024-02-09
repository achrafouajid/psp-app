"use client";
import React, { useState } from "react";
import { useStateContext } from "@/Contexts/ThemeContext";
import getRequest from "../../../../../../../../../server/patient/requests/getRequest";
import Image from "next/image";
import ModifyRequest from "./ModifyRequest";
import Button from "@/components/Button";
import { FaFilePdf } from "react-icons/fa";

export default function StatusRequest({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof getRequest>>>;
}) {
  const { currentColor } = useStateContext();
  const currentStatus = data.statuses.find((e) => e.current);
  const [showRequest, setShowRequest] = useState(false);

  return (
    <>
      {!showRequest && (
        <div className="w-full mt-20">
          <div className="border rounded-md border-[#396EA5] bg-[#F5F9FE]">
            <div className="text-sm text-center text-[#396EA5] font-bold mx-5 mt-5">
              <p> Votre Dossier est complété !</p>
              <p>
                Veuillez patienter pendant que votre demande est en cours de
                traitement ...
              </p>
              <div className="flex justify-center">
                <Image
                  src="/loading2.gif"
                  alt="loading"
                  height={250}
                  width={250}
                  className=""
                />
              </div>
              {/*     <div className="flex justify-center my-5">
                <Button
                  onClick={() => setShowRequest(true)}
                  color="white"
                  icon={<FaFilePdf />}
                  bgColor={currentColor}
                  text="Consulter Dossier"
                  borderRadius="10px"
                />
              </div>
              */}
            </div>
          </div>
        </div>
      )}
      {showRequest && <ModifyRequest />}
    </>
  );
}
