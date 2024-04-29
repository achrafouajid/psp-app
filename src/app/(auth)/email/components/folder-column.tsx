"use client";
import Link from "next/link";
import { FolderIcon } from "../icons/folder";
import { InboxIcon } from "../icons/inbox";
import { FlagIcon } from "../icons/flag";
import { SentIcon } from "../icons/sent";
import { useState } from "react";
type req =
  | "received"
  | "sent"
  | "draft"
  | "flagged"
  | "deleted"
  | "all"
  | "attachements";

export function FolderColumn() {
  const [selected, setselected] = useState<req>("sent");
  return (
    <div className="border-r border-gray-200 dark:border-gray-800 overflow-y-auto p-2 space-y-2">
      <ul>
        <Link href="/email?filter=received">
          <li className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center justify-between rounded-lg">
            <div className="flex items-center space-x-3">
              <InboxIcon />
              <span className="text-sm">Boîte de réception</span>
            </div>
            <span className="bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 text-xs w-6 flex justify-center">
              {/* folder.email_count*/} 8
            </span>
          </li>
        </Link>
        <Link href="/email?filter=flagged">
          <li className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center justify-between rounded-lg">
            <div className="flex items-center space-x-3">
              <FlagIcon />
              <span className="text-sm">Important</span>
            </div>
            <span className="bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 text-xs w-6 flex justify-center">
              {/* folder.email_count*/} 3
            </span>
          </li>
        </Link>
        <Link href="/email?filter=sent">
          <li className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center justify-between rounded-lg">
            <div className="flex items-center space-x-3">
              <SentIcon />

              <span className="text-sm">Envoyé</span>
            </div>
            <span className="bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 text-xs w-6 flex justify-center">
              {/* folder.email_count*/} 7
            </span>
          </li>
        </Link>
      </ul>
      <hr className="my-4 border-gray-200 dark:border-gray-800" />
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        <Link href="/email?filter=attachments">
          <li className="px-3 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center space-x-3 rounded-lg">
            <FolderIcon />
            <span className="text-sm">Pièces jointes</span>
          </li>
        </Link>
      </ul>
    </div>
  );
}
