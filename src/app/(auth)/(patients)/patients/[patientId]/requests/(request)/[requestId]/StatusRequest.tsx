"use client";
import React, { useState, useTransition } from "react";
import MyButton from "@/components/Button";
import { useStateContext } from "@/Contexts/ThemeContext";
import getRequest from "../../../../../../../../../server/patient/requests/getRequest";
import Image from "next/image";
import ModifyRequest from "./ModifyRequest";
import Button from "@/components/Button";
import { FaFilePdf } from "react-icons/fa";
import newRequestStatus from "../../../../../../../../../server/patient/requests/newRequestStatus";
import { RequestStatusEnum } from "@prisma/client";
import toast from "react-hot-toast";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { usePatient } from "@/Contexts/PatientContext";

export default function StatusRequest({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof getRequest>>>;
}) {
  const { currentColor } = useStateContext();
  const currentStatus = data.statuses.find((e) => e.current);
  const [showRequest, setShowRequest] = useState(false);
  const [loading, start] = useTransition();
  const router = useRouter();
  const patient = usePatient();

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
              <div className="flex mb-5 justify-between items-center">
                <MyButton
                  color="white"
                  onClick={async () => {
                    const motif = window.prompt("Motif de refus ?");
                    start(() =>
                      newRequestStatus(
                        data.id,
                        RequestStatusEnum.Refuse,
                        motif ?? undefined
                      ).then((re) => {
                        router.replace(
                          `/patients/${patient.id}/requests/?id=${patient.id}`
                        );
                        toast.error("Dossier refusé");
                      })
                    );
                  }}
                  bgColor="red"
                  text="Refuser Dossier"
                  borderRadius="10px"
                  disabled={loading}
                  icon={<FaXmark />}
                />
                <MyButton
                  type="submit"
                  color="white"
                  bgColor={currentColor}
                  borderRadius="10px"
                  text="Accepter Dossier"
                  disabled={loading}
                  icon={<FaCheck />}
                  onClick={async () =>
                    start(() =>
                      newRequestStatus(data.id, RequestStatusEnum.Accepte).then(
                        (re) => {
                          router.replace(
                            `/patients/${patient.id}/requests/?id=${patient.id}`
                          );
                          toast.success("Dossier accepté");
                        }
                      )
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {showRequest && <ModifyRequest />}
    </>
  );
}
