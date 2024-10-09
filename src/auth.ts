import NextAuth from "next-auth"
import kakao from "next-auth/providers/kakao"
import naver from "next-auth/providers/naver"
import type { Provider } from "next-auth/providers"
import Credentials from "next-auth/providers/credentials"

const providers: Provider[] = [
  Credentials({
    credentials: { email: {}, password: { label: "Password", type: "password" } },
    authorize(c) {
      if (c.password !== "password") return null
      return {
        id: "test",
        name: "Test User",
        email: "test@example.com",
      }
    },
  }),
  kakao,
  naver
]
 
export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  providers,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user, credentials }) {
      const isAllowedToSignIn = user && credentials
      if (isAllowedToSignIn) {
        console.log(credentials)
        return '/signout'
      } else {
        // Return false to display a default error message
        return '/'
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  }
})

