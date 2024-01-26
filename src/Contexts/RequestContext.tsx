"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import getRequest from "../../server/patient/requests/getRequest";
type Request = NonNullable<Awaited<ReturnType<typeof getRequest>>>;
type prpRequest = {
  update: Dispatch<SetStateAction<Request>>;
  data: Request;
};
const Context = createContext<prpRequest>(null as never);

export const useRequest = () => useContext(Context);

export default function RequestProvider(props: {
  children: ReactNode;
  request: Request;
}) {
  const [req, setRequest] = useState(props.request);
  useEffect(() => {
    setRequest(props.request);
  }, [props.request]);
  return (
    <Context.Provider
      value={{
        data: req,
        update: setRequest,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
