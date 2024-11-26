import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";
import Credentials from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { z } from "zod";
import type { User } from "./src/app/lib/definitions";
import { supabase } from "./src/app/lib/supabase";
import bcrypt from 'bcryptjs';

async function getUser(email: string):Promise <User | undefined>{
  try{
    const {data, error} = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

    if(error){
      console.error('Error fetching user: ', error.message);
      return undefined;
    }
    return data as unknown as User;
  } catch(error){
    console.error("Unexpected error:", error);
    return undefined;
  }
}

export const { handlers, signIn, signOut, auth} = NextAuth({
    ...authConfig,
    providers: [
      Kakao({
        clientId: process.env.AUTH_KAKAO_ID,
        clientSecret: process.env.AUTH_KAKAO_SECRET,
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
    Credentials({
      async authorize(credential, request) {
          const response = await fetch(request)
          if (!response.ok) return null
          return (await response.json()) ?? null

        // const parsedCredentials = z
        // .object({ email: z.string().email(), password: z.string().min(6) })
        // .safeParse(credentials);

        // if (parsedCredentials.success) {
        //     const { email, password } = parsedCredentials.data;

        //     const user = await getUser(email);
        //     if(user) console.log(user.email);
        //     if (!user) return null;
        //     const passwordsMatch = await bcrypt.compare(password, user.password);
        //     console.log("authorize");
        //     if (passwordsMatch) return user;
        //   }
   
        //   console.log('Invalid credentials');
        //   return null;
    },
//       async authorize(credentials, request) { // you have access to the original request as well
//   if(!isValidCredentials(credentials)) {
//      throw new CustomError()
//   }
//   return await getUser(credentials) // assuming it returns a User or null
// }
    }
  )
],
// adapter: SupabaseAdapter({
//   url: 'https://sswtvaddbhvopqkejedo.supabase.co',
//   secret: process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "",
// }),
debug: true,
secret: process.env.AUTH_SECRET,
});

