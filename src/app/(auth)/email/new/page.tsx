import { FolderColumn } from "../components/folder-column";
import { SendIcon } from "../icons/send";
import { EmailBody } from "./email-body";
import React from "react";
import { getAllUserswithcurrent } from "../../../../../server/auth/getAllUsers";
import currentUser from "../../../../../server/auth/currentUser";
import { Chip, Tooltip } from "@nextui-org/react";
import dynamic from "next/dynamic";
import Editor from "../../(blog)/add-blog/Editor";
import { EmailListColumn } from "../components/email-list-column";
const PageContent = dynamic(() => import("./PageContent"), { ssr: false });

export default function Page() {
  return (
    <div className="grid grid-cols-6 gap-2 h-screen p-2">
      <FolderColumn />
      <Compose />
    </div>
  );
}

async function Compose() {
  const data = await getAllUserswithcurrent();

  return (
    <form className="col-span-5 flex flex-col w-12/20">
      {" "}
      {/*action={sendEmail}*/}
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 p-2 sticky top-0 h-[60px]">
        <button
          className="flex ml-auto hover:bg-gray-200 dark:hover:bg-gray-800 rounded px-3 py-2"
          type="submit"
        >
          <SendIcon />
        </button>
      </div>
      <PageContent data={data} />
    </form>
  );
}
