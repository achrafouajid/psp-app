import React, { Suspense } from "react";
import { EmailEmptyView } from "./email-empty-view";
import { Toolbar, ToolbarSkeleton } from "./toolbar";

export default function SelectedEmailColumn() {
  if (null) {
    return <EmailEmptyView />;
  }

  return (
    <div className="col-span-3 flex flex-col w-12/20">
      <Suspense fallback={<ToolbarSkeleton />}>
        <Toolbar />
      </Suspense>
      <div className="p-4 space-y-4 flex-grow overflow-y-auto">
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <h2 className="text-xl font-bold"></h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {/*`From: ${folderName === "sent" ? "Me" : formatEmailString()}`*/}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {/*`To: ${folderName === "sent" ? formatEmailString(email) : "Me"}`*/}
          </p>
          <time className="text-xs text-gray-500 dark:text-gray-400">
            {new Date().toLocaleString()}
          </time>
        </div>
        <div>
          <p>email body</p>
        </div>
      </div>
    </div>
  );
}
