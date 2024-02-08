"use client";
import React from "react";
import getAllRegions from "../../../../server/region/getAllRegions";
import AddCityPopUp from "./AddCityPopUp";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import remove_city from "../../../../server/region/remove_city";
import { TiDelete } from "react-icons/ti";
import remove_region from "../../../../server/region/remove_region";

export default function Region(
  region: NonNullable<Awaited<ReturnType<typeof getAllRegions>>>[number]
) {
  return (
    <ul
      className="border border-[#396EA5] rounded-3xl mt-5 p-4 max-w-sm"
      key={region.name}
    >
      <div className="flex justify-between items-center">
        <p className="text-xl font-medium text-[#396EA5] gap-1 flex items-center mx-2">
          <FaMapMarkerAlt />
          {region.name}
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Etes-vous sûrs de vouloir supprimer cette région ? Toutes les villes correspondantes seront supprimées ..."
                )
              ) {
                remove_region(region.id);
              }
            }}
            className="text-red-500 hover:text-red-700"
          >
            <TiDelete />
          </button>
        </p>
        <AddCityPopUp regionId={region.id} />
      </div>
      <div className="flex h-full flex-col">
        {region.city.map((city) => (
          <li className="flex items-center">
            <GoDotFill style={{ color: "#396EA5" }} />
            {city.name}
            <button
              onClick={() => remove_city(city.id)}
              className="text-red-500 hover:text-red-700"
            >
              <TiDelete />
            </button>
          </li>
        ))}
      </div>
    </ul>
  );
}
