import React from "react";
import Stepper from "../../Stepper";
import { BsClipboard2Pulse } from "react-icons/bs";
import {
  LuFolderArchive,
  LuFolderCheck,
  LuFolderClock,
  LuFolderSearch,
} from "react-icons/lu";
import Link from "next/link";

export default async function layout({ children }: any) {
  return (
    <div className="bg-white w-full flex flex-col px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Demandes</h2>
          <Link
            href="./add-request"
            className="flex items-center px-3 py-2.5 font-bold bg-white text-[#396EA5] border rounded-full"
          >
            <BsClipboard2Pulse size={20} className="mr-3" /> Créer une Demande
          </Link>
          <Link
            href="./add-request/second-request"
            className="flex items-center px-3 py-2.5 font-semibold hover:text-[#396EA5] hover:border hover:rounded-full"
          >
            <LuFolderCheck size={20} className="mr-3" /> Constitution du dossier
          </Link>
          <Link
            href="./add-request/third-request"
            className="flex items-center px-3 py-2.5 font-semibold hover:text-[#396EA5] hover:border hover:rounded-full"
          >
            <LuFolderArchive size={20} className="mr-3" /> Dossier complet
          </Link>
          <Link
            href="./add-request/request-status"
            className="flex items-center px-3 py-2.5 font-semibold hover:text-[#396EA5] hover:border hover:rounded-full"
          >
            <LuFolderClock size={20} className="mr-3" /> Etat du Dossier
          </Link>
          <Link
            href="./add-request/req"
            className="flex items-center px-3 py-2.5 font-semibold hover:text-[#396EA5] hover:border hover:rounded-full"
          >
            <LuFolderSearch size={20} className="mr-3" />
            Dossiers Acceptés / Refusés
          </Link>
        </div>
      </aside>

      <div className="w-full min-h-screen md:w-2/3 lg:w-3/4 mt-8 sm:max-w-xl sm:rounded-lg m-4">
        <Stepper />
        {children}
      </div>
    </div>
  );
}
