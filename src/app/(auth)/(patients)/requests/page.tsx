import React from "react";

import getAllRequests from "../../../../../server/patient/requests/getAllRequests";
import RequestList from "./RequestList";

export default async function page() {
  const data = await getAllRequests();
  return <RequestList data={data} />;
}
