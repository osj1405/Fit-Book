"use client"
import { signIn } from "next-auth/react";

export function NaverLogin(){
    return(
        <div>
            <form action={async() =>{
                await signIn('naver', { redirectTo: "/"});
            }
            }>
                <button type="submit">Naver로 로그인하기</button>
            </form>
        </div>
    );
}