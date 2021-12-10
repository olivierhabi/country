import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { NextApiRequest, NextApiResponse } from "next";

import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";
import { getUserByMail } from "../../../src/services/users";
import bcrypt from "../../../src/helpers/bcrypt";

const prisma = new PrismaClient();

const options = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        emailAddress: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = await getUserByMail(credentials.emailAddress);

        if (!user) {
          throw new Error("Invalid email or password!");
        }
        if (!user.password) {
          throw new Error("Invalid email or password!");
        }
        const status = bcrypt.compare(credentials.password, user.password);
        if (!status) {
          throw new Error("Invalid email or password!");
        }
        if (user) {
          return { id: user.id, email: user.email , name: user.firstName  };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: Adapters.Prisma.Adapter({ prisma }),
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-request",
  },
  secret: process.env.SECRET,
  callbacks: {
    async jwt(token: any, account: any) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    redirect: async (url: any, baseUrl: any) => {
      return await Promise.resolve(url);
    },
  },
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await NextAuth(req, res, options);
};
