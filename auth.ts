/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/db/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge'
import type { NextAuthConfig } from 'next-auth'
// import { cookies } from 'next/headers'
// import { NextResponse } from 'next/server'
import { cookies } from "next/headers";



export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        // Find user in database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        //  Check if user exists and if the passwords matches
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );

          // Check if password is correct return user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }

        // If user does not exist or password is incorrect return null
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      // Set user id from token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      //  If there is an update, set the user name
      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
    async jwt({ token, user, trigger, session }: any) {
      // Assign user fields to token
      if (user) {
        token.id = user.id;
        token.role = user.role;

        if (user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0];

          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }

        if (trigger === "signIn" || trigger === "signUp ") {
          const cookieObject = await cookies();
          const sessionCartId = cookieObject.get("sessionCartId")?.value;

          if (sessionCartId) {
            const sessionCart = await prisma.cart.findFirst({
              where: { sessionCartId },
            });
            console.log('session', sessionCartId)
            console.log('sessionCart', sessionCart)


            if (sessionCart) {
              //Delete user cart
              await prisma.cart.deleteMany({
                where: { userId: user.id },
              });
              
              //Assign new cart
              await prisma.cart.update({
                where: {id: sessionCart.id},
                data: {userId: user.id}
              })
            }
          }
        }
      }
      
        // Handle session updated
        if (session?.user.name && trigger === 'update') {
          token.name = session.user.name
        }

      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config)