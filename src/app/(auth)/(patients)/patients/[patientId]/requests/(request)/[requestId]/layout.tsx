import React from "react";
import Stepper from "./Stepper";
import { BsClipboard2Pulse } from "react-icons/bs";
import { LuFolderClock, LuFolderSearch } from "react-icons/lu";
import Link from "next/link";
import RequestProvider from "@/Contexts/RequestContext";
import getRequest from "../../../../../../../../../server/patient/requests/getRequest";
import { notFound } from "next/navigation";

export default async function layout({
  children,
  params: { requestId, patientId },
}: any) {
  const data = await getRequest(requestId, patientId);
  if (!data) notFound();
  return (
    <RequestProvider request={data}>
      <div className="bg-white w-full flex flex-col px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
          <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
            <h2 className="pl-3 mb-4 text-2xl font-semibold">Demandes</h2>
            <p className="flex items-center px-3 py-2.5 font-semibold hover:text-[#396EA5] hover:border hover:rounded-full">
              <BsClipboard2Pulse size={20} className="mr-3" /> Poursuivre
              Demande
            </p>
            <Link
              href={`/requests/${requestId}/`}
              className="flex items-center px-3 py-2.5 font-semibold hover:text-[#396EA5] hover:border hover:rounded-full"
            >
              <LuFolderSearch size={20} className="mr-3" />
              Etat du Dossier
            </Link>
            <Link
              href="/requests"
              className="flex items-center px-3 py-2.5 font-semibold hover:text-[#396EA5] hover:border hover:rounded-full"
            >
              <LuFolderClock size={20} className="mr-3" />
              Suivi Dossier
            </Link>
          </div>
        </aside>

        <div className="w-full min-h-screen md:w-2/3 lg:w-3/4 mt-8 sm:max-w-xl sm:rounded-lg m-4">
          <Stepper />

          {children}
        </div>
      </div>
    </RequestProvider>
  );
}
