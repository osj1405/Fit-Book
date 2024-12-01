import { redirect } from "next/navigation";

export default function SignUp(){
    return(
        <>
        <button onClick={
            redirect("/login")
        }>로그인 화면으로 되돌아가기</button>
        </>
    );
}