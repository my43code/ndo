import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { readAdminPassword } from "@/lib/adminPasswordStore";

import { timingSafeEqual, createHash } from "node:crypto";
import { getAuthSecret, isAdminEmail, normalizeEmail, secureSessionCookie } from "@/lib/adminAccess";

function buildOauthProviders() {
  const providers = [];

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    );
  }

  if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
    providers.push(
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      })
    );
  }

  return providers;
}

function buildCredentialsProvider() {
  return CredentialsProvider({
    name: "Admin Credentials",
    credentials: {
      email: { label: "Email", type: "email", placeholder: "admin@example.com" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = normalizeEmail(credentials?.email);
      const password = (credentials?.password || "").toString();

      if (!email || !password) {
        return null;
      }

      if (!isAdminEmail(email)) {
        return null;
      }

      let passwordHash;
      try {
        passwordHash = await readAdminPassword(email);
      } catch (error) {
        console.error("Admin credential lookup failed:", error.message);
        throw new Error("AdminSignInUnavailable");
      }

      const initialPassword = process.env.ADMIN_PASSWORD;
      const valid = passwordHash
        ? Buffer.byteLength(password, "utf8") <= 72 && await bcrypt.compare(password, passwordHash)
        : initialPassword && timingSafeEqual(
            createHash("sha256").update(password).digest(),
            createHash("sha256").update(initialPassword).digest()
          );

      if (valid) {
        return { id: email, name: process.env.ADMIN_NAME || "Admin", email, role: "admin" };
      }

      return null;
    },
  });
}

export const authOptions = {
  secret: getAuthSecret(),
  useSecureCookies: secureSessionCookie,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [...buildOauthProviders(), buildCredentialsProvider()],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!getAuthSecret()) return "/login?error=Configuration";
      if (account?.provider === "google" && profile?.email_verified !== true) return false;
      if (!user?.email) {
        return "/login?error=AccessDenied";
      }

      if (!isAdminEmail(user.email)) {
        return "/login?error=AccessDenied";
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email || token.email;
        token.name = user.name || token.name;
        token.picture = user.image || token.picture;
        token.role = user.role || "admin";
        token.provider = account?.provider || token.provider;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email || session.user.email;
        session.user.name = token.name || session.user.name;
        session.user.image = token.picture || session.user.image;
        session.user.role = token.role || (token.email ? "admin" : "user");
        session.user.provider = token.provider || null;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      const destination = new URL(url, baseUrl);
      return destination.origin === new URL(baseUrl).origin
        ? destination.href
        : new URL("/admin", baseUrl).href;
    },
  },
};
