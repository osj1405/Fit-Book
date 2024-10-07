import NextAuth from "next-auth"
import kakao from "next-auth/providers/kakao"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [kakao({
    clientId: process.env.AUTH_KAKAO_ID,
    clientSecret: process.env.AUTH_KAKAO_SECRET,
  })],
})