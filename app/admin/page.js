import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, getAdminSessionToken } from "@/lib/admin-auth";
import LoginForm from "./LoginForm";
import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Panel de Administración",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE);
  const authenticated = session?.value === getAdminSessionToken();

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        {authenticated ? <AdminDashboard /> : <LoginForm />}
      </div>
    </section>
  );
}
