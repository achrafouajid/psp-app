"use client";
import { useRequest } from "@/Contexts/RequestContext";
import { RequestStatusEnum } from "@prisma/client";
import React, { ReactNode } from "react";
import { BsClipboard2Pulse } from "react-icons/bs";
import {
  LuFolderArchive,
  LuFolderCheck,
  LuFolderClock,
  LuFolderSearch,
} from "react-icons/lu";

export default function Stepper() {
  const { data } = useRequest();
  const currentStatus = data.statuses.find((e) => e.current);

  return (
    <div className="w-full pl-7 py-4">
      <div className="relative flex items-center justify-between w-full">
        <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300"></div>
        <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-[#396EA5] transition-all duration-500"></div>

        <Step
          icon={<BsClipboard2Pulse size={20} />}
          title=" Etape 1"
          desc="Créer Demande"
          active={currentStatus?.status === null}
        />
        <Step
          icon={<LuFolderCheck size={20} />}
          title=" Etape 2"
          desc="Constituer Dossier"
          active={currentStatus?.status === RequestStatusEnum.Cree}
        />
        <Step
          icon={<LuFolderArchive />}
          title=" Etape 3"
          desc="Compléter Dossier"
          active={currentStatus?.status === RequestStatusEnum.Constitue}
        />
        <Step
          icon={<LuFolderClock />}
          title=" Etape 4"
          desc="Etat Dossier"
          active={currentStatus?.status === RequestStatusEnum.Complete}
        />

        <Step
          icon={<LuFolderClock />}
          title=" Etape 5"
          desc="Dossier Accepté/Refusé"
          active={(
            [
              RequestStatusEnum.Refuse,
              RequestStatusEnum.Accepte,
            ] as RequestStatusEnum[]
          ).includes(currentStatus?.status as RequestStatusEnum)}
        />
      </div>
    </div>
  );
}

type props = {
  active: boolean;
  title: string;
  desc: string;
  icon: ReactNode;
};
export function Step(props: props) {
  return (
    <div
      className={"relative z-10 grid w-10 h-10 font-bold  transition-all duration-300  rounded-full place-items-center ".concat(
        props.active ? "bg-[#396EA5] text-white" : "bg-gray-300 text-[#396EA5]"
      )}
    >
      {props.icon}
      <div className="absolute -bottom-[4.5rem] w-max text-center">
        <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700">
          {props.title}
        </h6>
        <p className="block font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
          {props.desc}
        </p>
      </div>
    </div>
  );
}
