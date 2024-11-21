import NextAuth, { type DefaultSession } from "next-auth";
import { authConfig } from "./auth.config";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";
import { SupabaseAdapter } from "@auth/supabase-adapter";


export const { handlers, signIn, signOut, auth} = NextAuth({
    ...authConfig,
    providers: [
      Kakao({
        clientId: process.env.AUTH_KAKAO_ID,
        clientSecret: process.env.AUTH_KAKAO_SECRET,
        authorization: "https://kauth.kakao.com/oauth/authorize?scope",
        token: "https://kauth.kakao.com/oauth/token",
        userinfo: "https://kapi.kakao.com/v2/user/me",
        async profile(profile, token){
          console.log(token);
          // profile db에 있는지 확인 후 없으면 추가하는 Login 넣기
            return {
              id: profile.id,
              name: profile.properties.nickname,
              email: profile.kakao_account.email,
              image: profile.properties.profile_image,
            };
        },
        
    }), 
    Naver({
        clientId: process.env.AUTH_NAVER_ID,
        clientSecret: process.env.AUTH_NAVER_SECRET,
        profile(profile) {
          console.log(profile);
          return {
            id: profile.response.id,
            name: profile.response.nickname,
            email: profile.response.email,
            image: profile.response.profile_image,
          }
        }
    }),
],
adapter: SupabaseAdapter({
  url: process.env.SUPABASE_URL ?? "",
  secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
}),
});

