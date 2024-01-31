import React from "react";

import getAllRequests from "../../../../../server/patient/requests/getAllRequests";
import RequestList from "./RequestList";
import Header from "@/components/Header";

export default async function page() {
  const data = await getAllRequests();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header category="Demandes" title={`Liste des Demandes`} />
      <RequestList data={data} />
    </div>
  );
}
