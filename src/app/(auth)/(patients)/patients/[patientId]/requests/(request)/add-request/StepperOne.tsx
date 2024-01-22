import React from "react";
import { BsClipboard2Pulse } from "react-icons/bs";
import {
  LuFolderArchive,
  LuFolderCheck,
  LuFolderClock,
  LuFolderSearch,
} from "react-icons/lu";

export default function StepperOne() {
  return (
    <div className="w-full pl-7 py-4">
      <div className="relative flex items-center justify-between w-full">
        <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300"></div>
        <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-900 transition-all duration-500"></div>
        <div className="relative z-10 grid w-10 h-10 font-bold text-white transition-all duration-300 bg-gray-900 rounded-full place-items-center">
          <BsClipboard2Pulse size={20} />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700">
              Etape 1
            </h6>
            <p className="block font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
              Créer Demande
            </p>
          </div>
        </div>
        <div className="relative z-10 grid w-10 h-10 font-bold text-gray-900 transition-all duration-300 bg-gray-300 rounded-full place-items-center">
          <LuFolderCheck size={20} />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700">
              Etape 2
            </h6>
            <p className="block font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
              Constituer Dossier
            </p>
          </div>
        </div>
        <div className="relative z-10 grid w-10 h-10 font-bold text-gray-900 transition-all duration-300 bg-gray-300 rounded-full place-items-center">
          <LuFolderArchive />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700">
              Etape 3
            </h6>
            <p className="block font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
              Compléter Dossier
            </p>
          </div>
        </div>
        <div className="relative z-10 grid w-10 h-10 font-bold text-gray-900 transition-all duration-300 bg-gray-300 rounded-full place-items-center">
          <LuFolderClock size={20} />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700">
              Etape 4
            </h6>
            <p className="block font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
              Etat Dossier
            </p>
          </div>
        </div>
        <div className="relative z-10 grid w-10 h-10 font-bold text-gray-900 transition-all duration-300 bg-gray-300 rounded-full place-items-center">
          <LuFolderSearch size={20} />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700">
              Etape 5
            </h6>
            <p className="block font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
              Dossier Accepté/Refusé
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
