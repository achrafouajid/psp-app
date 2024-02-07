import AuthSession from "@/Contexts/UserContext";
import AdminLayout from "@/components/AdminLayout";
import currentUser from "../../../server/auth/currentUser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Refresher from "./Refresher";

export default async function layout({ children }: any) {
  const user = await currentUser();

  if (!user) {
    redirect("/logout");
  } else {
    return (
      <AuthSession user={user!}>
        <Refresher />
        <AdminLayout>{children}</AdminLayout>
      </AuthSession>
    );
  }
}
