"use client"
import { signIn } from "next-auth/react"
 
export function KaKaoLogin() {
  return (
    <div>
    <form
      action={async() => {
       await signIn("kakao", { redirectTo: "/"})
      }}
    >
      <button type="submit">KaKao로 로그인하기</button>
    </form>

    </div>
  )
} 