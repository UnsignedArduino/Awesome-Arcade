import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import queryDb from "@/scripts/Database";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: {
    error: "/auth/error", // Error code passed in query string as ?error=
  },
  callbacks: {
    // @ts-ignore
    async signIn({ user }) {
      try {
        const id = parseInt(user.id);
        const { name, email, image } = user;
        const matchingIDs = await queryDb(
          "SELECT id FROM users WHERE EXISTS (SELECT id FROM users WHERE id=$1)",
          [id]
        );
        if (matchingIDs.rowCount === 0) {
          await queryDb(
            "INSERT INTO users (id, name, email, profile) VALUES ($1, $2, $3, $4)",
            [id, name, email, image]
          );
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);
