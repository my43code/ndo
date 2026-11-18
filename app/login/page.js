import LoginClient from "@/components/LoginClient";
import { authOptions } from "@/lib/auth";

export default async function LoginPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const providers = authOptions.providers
    .filter(({ type }) => type === "oauth")
    .map(({ id, name }) => ({ id, name }));

  return <LoginClient initialErrorCode={resolvedSearchParams?.error || ""} providers={providers} />;
}
