import React from "react";
import getAllRegions from "../../../../server/region/getAllRegions";
import AddCityPopUp from "./AddCityPopUp";

export default function Region(
  region: NonNullable<Awaited<ReturnType<typeof getAllRegions>>>[number]
) {
  return (
    <ul className="p-6" key={region.name}>
      <AddCityPopUp regionId={region.id} />
      {region.name}
      {region.city.map((city) => (
        <li>{city.name}</li>
      ))}
    </ul>
  );
}
