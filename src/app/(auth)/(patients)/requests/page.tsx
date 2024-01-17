import React from "react";

import Request from "./Request";
import getAllRequests from "../../../../../server/patient/requests/getAllRequests";

export default async function page() {
  const data = await getAllRequests();
  return <Request data={data} />;
}
