"use client";
import { ReactNode, createContext, useContext } from "react";
import getPatient from "../../server/patient/get_patient";

const Context = createContext<
  NonNullable<Awaited<ReturnType<typeof getPatient>>>
>(null as never);

export const usePatient = () => useContext(Context);

export default function PatientProvider(props: {
  children: ReactNode;
  patient: NonNullable<Awaited<ReturnType<typeof getPatient>>>;
}) {
  return (
    <Context.Provider value={props.patient}>{props.children}</Context.Provider>
  );
}
