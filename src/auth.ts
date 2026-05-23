import NextAuth, { DefaultSession } from "next-auth";
import CredentialProviders from "next-auth/providers/credentials";

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
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
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
  session: { strategy: "jwt" },
});
