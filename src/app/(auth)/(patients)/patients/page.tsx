import React from "react";
import getAllPatients from "../../../../../server/patient/getAllpatients";
import PageContent from "../patients/pageContent";

export default async function page() {
  const data = await getAllPatients();
  return <PageContent data={data} />;
}
