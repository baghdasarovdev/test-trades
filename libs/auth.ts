import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const fakeUser = {
  id: "1",
  name: "Rado",
  email: "user@example.com",
  password: bcrypt.hashSync("password321", 10),
};

export const { auth, handlers } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === fakeUser.email &&
          bcrypt.compareSync(credentials.password as string, fakeUser.password)
        ) {
          return { id: fakeUser.id, name: fakeUser.name, email: fakeUser.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});
