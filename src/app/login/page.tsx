import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export default function LoginPage(){
    return (
        <div>
          <h1>Login</h1>
          <form>
            <label>이메일</label>
            <input type="text" placeholder="이메일을 입력하시오."/>
            <label>비밀번호</label>
            <input type="password" placeholder="비밀번호를 입력하시오."/>
            <button type="submit">
                Login
            </button>
          </form>
          <form action={ async ()=>
        {
            'use server'
            try{
            await signIn("kakao", {redirectTo: "/"});
            } catch(error){
                if (error instanceof AuthError) {
                    return redirect('/auth_error')
                  }
                throw error;
            }
        }
        }>
            <button type="submit">Login With KaKao</button>
        </form>
        <form action={ async ()=>
            {
                'use server'
                await signIn("naver", {redirectTo: "/"});
            }
            }>
            <button type="submit">Login With Naver</button>
        </form>
        </div>
      );
}