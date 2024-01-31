import React from "react";
import Home from "./Home";
import getPatientCount from "../../../../server/patient/getPatientCount";
import getRequestCount from "../../../../server/patient/requests/getRequestCount";
import {
  getCompletedRequestsCount,
  getConstitueRequestsCount,
  getPendingRequestsCount,
} from "../../../../server/patient/requests/getRequestsCount";
import getAllRegions from "../../../../server/region/getAllRegions";

export default async function page() {
  const [count, count2, constitue, complete, attente, regions] =
    await Promise.all([
      getPatientCount(),
      getRequestCount(),
      getConstitueRequestsCount(),
      getCompletedRequestsCount(),
      getPendingRequestsCount(),
      getAllRegions(),
    ]);
  return (
    <div>
      <Home
        data={count}
        data2={count2}
        constitue={constitue}
        complete={complete}
        attente={attente}
        regions={regions}
      />
    </div>
  );
}
