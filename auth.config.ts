import { NextAuthConfig } from "next-auth";

export const authConfig:NextAuthConfig = {
    pages: {
        signIn: '/login',
        error: `/auth_error`
    },
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 30,
        updateAge: 60 * 60 * 24,
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnHome = nextUrl.pathname.startsWith("/");
            if (isOnHome) {
              if (isLoggedIn)  return true;
              return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
              return Response.redirect(new URL('/login', nextUrl));
            }
            return true;
          },
          async session({ session, token }) {
            // session 객체에 사용자 데이터를 포함시킵니다.
            if (token) {
                session.user = {
                    ...session.user,
                    email: token.email,
                    name: token.name,
                    image: token.picture,
                };
            }
            return session;
        },
        async jwt({ token, user }) {
          // JWT 토큰에 사용자 데이터를 포함시킵니다.
          if (user) {
              token.id = user.id;
              token.email = user.email;
              token.name = user.name;
              token.picture = user.image;
          }
          return token;
      },

    },
    providers: [],
} satisfies NextAuthConfig;

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       email: string;
//       name: string;
//       image: string;
//     } & DefaultSession["user"];
//   }

//   interface JWT {
//     id: string;
//     email: string;
//     name: string;
//     picture: string;
//   }
// }