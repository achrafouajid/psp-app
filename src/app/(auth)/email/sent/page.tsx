import { Suspense } from "react";

import { FolderColumn } from "../components/folder-column";
import { EmailListColumn } from "../components/email-list-column";
import { EmailEmptyView } from "../components/email-empty-view";
import SelectedEmailColumn from "../components/SelectedEmail";

export default function EmailPage({ searchParams }: { searchParams: any }) {
  return (
    <div className="grid grid-cols-6 gap-2 h-screen">
      <FolderColumn />
      <EmailListColumn params={"sent"} />
      <Suspense fallback={<EmailEmptyView />}>
        <SelectedEmailColumn />
      </Suspense>
    </div>
  );
}
