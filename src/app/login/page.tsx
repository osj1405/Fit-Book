import { KaKaoLogin } from "@/src/components/KaKaoLogin";
import { NaverLogin } from "@/src/components/NaverLogin";
import LoginForm from "@/src/components/LoginForm";

export default function LoginPage(){

    return (
        <div>
          <h1>Login</h1>
          <LoginForm />
            <KaKaoLogin />
            <NaverLogin />
        </div>
      );
}