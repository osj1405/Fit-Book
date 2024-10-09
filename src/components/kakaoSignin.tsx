import { signIn } from "@/auth"
import styles from "../styles/KaKaoSignIn.module.css"

export default function SignIn() {
  return (
    <form className={styles.contaienr}
      action={async () => {
        "use server"
        await signIn("kakao")
      }}
    >
      <button className={styles.kakaoSignIn} type="submit">Kakao로 로그인하기</button>
    </form>
  )
} 