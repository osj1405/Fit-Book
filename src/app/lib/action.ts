"use server"

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { supabase } from "./supabase";
import { User } from "@supabase/supabase-js";
import { z } from "zod";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', {formData, redirectTo: "/"});
    } catch (error) {
        console.log(error);
        if (error instanceof AuthError) {
            switch (error.type) {
            case 'CredentialsSignin':
                return 'Invalid credentials.2';
            default:
                return '가입 정보가 존재하지 않습니다.';
            }
        }
      throw error;
    }
  }

  const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    image: z.string().optional(),
    stateMessage: z.string().optional()
});

const CreateUser = UserSchema.omit({
  email: true,
  
})
  export async function signUp({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    prevState,
    formData
  }:{
      prevState: string | undefined,
      formData: FormData,
    }){
      try{
        const { data, error } = await supabase
        .from('users')
        .insert(formData);

        if(error){
          console.error('Error inserting user: ', error.message);
          return undefined;
        }
        return data as unknown as User;
      } catch(error){
        console.error('Unexpercted error: ', error);
        return undefined;
      }
  }
  