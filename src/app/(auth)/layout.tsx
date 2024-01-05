import AuthSession from "@/Contexts/UserContext";
import AdminLayout from "@/components/AdminLayout";
import currentUser from "../../../server/auth/currentUser";

export default async function layout({ children }: any) {
    const user = await currentUser();
    return (
      <AuthSession user={user!}>
      <AdminLayout>
          {children}
      </AdminLayout>
      </AuthSession>
  )
}