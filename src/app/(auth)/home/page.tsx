import React from "react";
import Home from "./Home";
import getPatientCount from "../../../../server/patient/getPatientCount";
import getRequestCount from "../../../../server/patient/requests/getRequestCount";
import {
  getAcceptedRequestsCount,
  getCompletedRequestsCount,
  getPendingRequestsCount,
} from "../../../../server/patient/requests/getRequestsCount";

export default async function page() {
  const [count, count2, accepted, complete, pending] = await Promise.all([
    getPatientCount(),
    getRequestCount(),
    getAcceptedRequestsCount(),
    getCompletedRequestsCount(),
    getPendingRequestsCount(),
  ]);
  return (
    <div>
      <Home
        data={count}
        data2={count2}
        accepted={accepted}
        complete={complete}
        pending={pending}
      />
    </div>
  );
}
