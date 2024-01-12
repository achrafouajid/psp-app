import React from "react";
import Stepper from "../Stepper";

export default async function layout({ children }: any) {
  return (
    <div className="bg-white w-full flex flex-col px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Demandes</h2>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 font-bold bg-white text-[#396EA5] border rounded-full"
          >
            Constitution du dossier
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 font-semibold hover:text-[#396EA5] hover:border hover:rounded-full"
          >
            Dossier complet
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 font-semibold hover:text-[#396EA5] hover:border hover:rounded-full"
          >
            Dossier en attente
          </a>
        </div>
      </aside>
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <Stepper />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
