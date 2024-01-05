"use client"
import { User } from "@prisma/client";
import { ReactNode, createContext, useContext } from "react";

const Context = createContext<User>(null as never)

export const useSession = () => useContext(Context);

export default function AuthSession(props: { children: ReactNode, user: User }) {
    return <Context.Provider value={props.user}>
        {props.children}
    </Context.Provider>
}