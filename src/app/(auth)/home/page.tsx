import React from "react";
import Home from "./Home";
import getPatientCount from "../../../../server/patient/getPatientCount";
import getRequestCount from "../../../../server/patient/requests/getRequestCount";

export default async function page() {
  const [count, count2] = await Promise.all([
    getPatientCount(),
    getRequestCount(),
  ]);
  return (
    <div>
      <Home data={count} data2={count2} />
    </div>
  );
}
