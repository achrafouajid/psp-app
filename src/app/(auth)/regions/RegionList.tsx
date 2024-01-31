import React from "react";
import getAllRegions from "../../../../server/region/getAllRegions";
import Region from "./Region";

export default async function RegionList() {
  const regions = await getAllRegions();
  return (
    <div>
      {regions.map((region) => (
        <Region key={region.id} {...region} />
      ))}
    </div>
  );
}
