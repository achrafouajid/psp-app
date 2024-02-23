import React from "react";
import getPatientCount from "../../../../server/patient/getPatientCount";
import getRequestCount from "../../../../server/patient/requests/getRequestCount";
import {
  getAcceptedRequestsCount,
  getCompletedRequestsCount,
  getConstitueRequestsCount,
  getCreatedequestsCount,
  getPendingRequestsCount,
  getRefusedRequestsCount,
} from "../../../../server/patient/requests/getRequestsCount";
import getAllRegions from "../../../../server/region/getAllRegions";
import Home from "./Home";
import getDocPatientCount from "../../../../server/doctor/doc_patientCount";
import getAllDoctors from "../../../../server/doctor/getAllDoctors";
export default async function LaboDashboard() {
  const [
    count,
    count2,
    constitue,
    complete,
    attente,
    regions,
    accepte,
    refuse,
    cree,
    doctors,
    docpatients,
  ] = await Promise.all([
    getPatientCount(),
    getRequestCount(),
    getConstitueRequestsCount(),
    getCompletedRequestsCount(),
    getPendingRequestsCount(),
    getAllRegions(),
    getAcceptedRequestsCount(),
    getRefusedRequestsCount(),
    getCreatedequestsCount(),
    getDocPatientCount(),
    getAllDoctors(),
  ]);

  return (
    <Home
      data={count}
      data2={count2}
      constitue={constitue}
      complete={complete}
      attente={attente}
      regions={regions}
      accepte={accepte}
      refuse={refuse}
      cree={cree}
      doctors={doctors}
      docpatients={docpatients}
    />
  );
}
