"use server"

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

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
                return 'Invalid credentials.';
            default:
                return '가입 정보가 존재하지 않습니다.';
            }
        }
      throw error;
    }
  }
