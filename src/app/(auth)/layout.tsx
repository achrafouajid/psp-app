import AuthSession from "@/Contexts/UserContext";
import AdminLayout from "@/components/AdminLayout";
import currentUser from "../../../server/auth/currentUser";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import Refresher from "./Refresher";
import jwtDecoded from "../../../server/auth/jwtDecoded";
import { makeJwt } from "../../../server/auth/login";

export default async function layout({ children }: any) {
  const user = await currentUser();

  if (!user) {
    redirect("/logout");
  } else {
    const token = jwtDecoded();
    if (token.role != user.role) {
      const from = headers().get("referer");

      const jwt = await makeJwt(user);
      redirect(`/refresh?from=${from}&jwt=${jwt}`);
    }

    return (
      <AuthSession user={user!}>
        <Refresher />
        <AdminLayout>{children}</AdminLayout>
      </AuthSession>
    );
  }
}
