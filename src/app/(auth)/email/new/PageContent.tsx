"use client";
import React from "react";
import ListBox from "./ListBox";
import { Chip, Tooltip } from "@nextui-org/react";
import { EmailBody } from "./email-body";
import { useSession } from "@/Contexts/UserContext";
import { getAllUserswithcurrent } from "../../../../../server/auth/getAllUsers";

export default function PageContent({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof getAllUserswithcurrent>>>;
}) {
  const user = useSession();
  return (
    <div className="p-1 space-y-1 flex-grow overflow-y-auto text-sm">
      <div className="relative flex flex-col justify-center space-y-2">
        <ListBox data={data} />
      </div>
      <hr className="border-t border-gray-200 dark:border-gray-800" />
      <div className="relative flex flex-col space-y-2">
        <label className="absolute left-3 top-4 text-gray-500 dark:text-gray-400">
          De :{" "}
        </label>

        <p className="pl-12 border-none bg-white dark:bg-gray-950 text-black dark:text-white px-3 py-2 focus:outline-none">
          <Tooltip content={user?.email}>
            <Chip>{user?.firstName + " " + user?.lastName}</Chip>
          </Tooltip>
        </p>
      </div>
      <hr className="border-t border-gray-200 dark:border-gray-800" />
      <div className="relative flex flex-col space-y-2">
        <label
          className="absolute left-3 top-4 text-gray-500 dark:text-gray-400"
          htmlFor="subject"
        >
          Sujet:
        </label>
        <input
          className="pl-[72px] border-none bg-white dark:bg-gray-950 text-black dark:text-white px-3 py-2 focus:outline-none"
          id="subject"
          type="text"
          name="subject"
          required
        />
      </div>
      <hr className="border-t border-gray-200 dark:border-gray-800" />
      <EmailBody />
    </div>
  );
}
