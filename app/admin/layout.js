import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AuthProvider from "@/components/AuthProvider";
import { getAuthSecret, isAdminEmail } from "@/lib/adminAccess";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function Layout({ children }) {
  if (!getAuthSecret()) redirect("/login?error=Configuration");

  const session = await getServerSession(authOptions);
  if (!isAdminEmail(session?.user?.email)) redirect("/login");

  return <AuthProvider session={session}>{children}</AuthProvider>;
}
