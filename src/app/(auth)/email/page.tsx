import { Suspense } from "react";
import { FolderColumn } from "./components/folder-column";
import { EmailListColumn } from "./components/email-list-column";
import { EmailEmptyView } from "./components/email-empty-view";
import SelectedEmailColumn from "./components/SelectedEmail";
import { notFound } from "next/navigation";

export default function EmailPage({ searchParams }: { searchParams: any }) {
  notFound();
  return (
    <div className="grid grid-cols-6 gap-2 h-screen">
      <FolderColumn />
      <EmailListColumn params={searchParams.filter} />
      <Suspense fallback={<EmailEmptyView />}>
        <SelectedEmailColumn />
      </Suspense>
    </div>
  );
}
