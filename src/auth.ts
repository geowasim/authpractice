import NextAuth, { DefaultSession } from "next-auth";
import CredentialProviders from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role?: "ADMIN" | "USER";
  }
  interface Session {
    user: {
      role?: "ADMIN" | "USER";
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "USER";
    loginTime?: number;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialProviders({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "admin@test.com" &&
          credentials?.password === "123456"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@test.com",
            role: "ADMIN",
          };
        }
        if (
          credentials?.email === "user@test.com" &&
          credentials?.password === "123456"
        ) {
          return {
            id: "2",
            name: "User",
            email: "user@test.com",
            role: "USER",
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.loginTime = Date.now(); //start time
      }
      const sixMonths = 6 * 30 * 24 * 60 * 60 * 1000; // absloute max session login time
      if (token.loginTime && Date.now() - token.loginTime > sixMonths) {
        return null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as "ADMIN" | "USER";
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/signin",
  },
});
