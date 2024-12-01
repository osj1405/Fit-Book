"use client"

import { KaKaoLogin } from "@/src/components/KaKaoLogin";
import { NaverLogin } from "@/src/components/NaverLogin";
import { useRouter } from "next/navigation";
import LoginForm from "@/src/components/LoginForm";
export default function LoginPage(){
  const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 h-screen w-full">
          <h1 className="font-bold text-4xl text-blue-500 mb-20">Fit Book</h1>
          <LoginForm />
          <button
          onClick={()=> router.replace(`/signup`)}
          className="font-medium mb-3 bg-blue-500 w-60 border text-white rounded-md h-8"
          >회원가입</button>
            <KaKaoLogin />
            <NaverLogin />
        </div>
      );
}