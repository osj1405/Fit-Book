"use client"
import { authenticate } from "../app/lib/action"
import { useActionState } from "react";

export default function LoginForm(){
    const [ errorMessage, Formaction, isPending ] = useActionState(
        authenticate,
        undefined,
      );
    
    return(
        <form action={Formaction}>
            <label>이메일</label>
            <input type="email" placeholder="이메일을 입력하시오."></input>
            <label>비밀번호</label>
            <input type="password" placeholder="비밀번호를 입력하시오."></input>
            <button type="submit" aria-disabled={isPending}>로그인</button>
            {errorMessage && (
            <>
              <p className='text-sm text-red-500'>{errorMessage}</p>
            </>
          )}
        </form>
    )
}
