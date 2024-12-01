"use client"
import { authenticate } from "../app/lib/action"
import { useActionState } from "react";

export default function LoginForm(){
    const [ errorMessage, Formaction, isPending ] = useActionState(
        authenticate,
        undefined,
      );
    
    return(
        <form action={Formaction} className="flex flex-col mb-4">
            <label>이메일</label>
            <input className="mb-2 w-60 h-8 placeholder:text-gray-300 rounded-sm"  type="email" placeholder="이메일을 입력하시오."></input>
            <label>비밀번호</label>
            <input className="mb-5 w-60 h-8 placeholder:text-gray-300 rounded-sm" type="password" placeholder="비밀번호를 입력하시오."></input>
            <button className="h-8 font-medium rounded-md block border bg-blue-500 text-white" type="submit" aria-disabled={isPending}>로그인</button>
            {errorMessage && (
            <>
              <p className='text-sm text-red-500'>{errorMessage}</p>
            </>
          )}
        </form>
    )
}
