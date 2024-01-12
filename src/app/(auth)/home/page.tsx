import React from "react";
import Home from "./Home";
import getPatientCount from "../../../../server/patient/getPatientCount";

export default async function page() {
  const [count] = await Promise.all([getPatientCount()]);
  return (
    <div>
      <Home data={count} />
    </div>
  );
}
