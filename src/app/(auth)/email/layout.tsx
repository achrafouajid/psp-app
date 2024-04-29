import Header from "@/components/Header";
import { getAllEmails } from "../../../../server/email/getAllEmails";
import { notFound } from "next/navigation";
import MailProvider from "@/Contexts/MailContext";

export default async function layout({ children }: any) {
  const data = await getAllEmails();
  if (!data) notFound();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header category="Applications" title="Courrier" />
      <MailProvider>{children}</MailProvider>
    </div>
  );
}
