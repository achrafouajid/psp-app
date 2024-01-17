"use client";
import { User } from "@prisma/client";
import { ReactNode, createContext, useContext } from "react";
import currentUser from "../../server/auth/currentUser";

const Context = createContext<
  NonNullable<Awaited<ReturnType<typeof currentUser>>>
>(null as never);

export const useSession = () => useContext(Context);

export default function AuthSession(props: {
  children: ReactNode;
  user: NonNullable<Awaited<ReturnType<typeof currentUser>>>;
}) {
  return (
    <Context.Provider value={props.user}>{props.children}</Context.Provider>
  );
}
