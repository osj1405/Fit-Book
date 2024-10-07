import { signIn } from "@/auth"
import styles from "../styles/kakaoSignin.module.css"

export default function KakaoSignIn() {
  return (
    <form className={styles.container}
      action={async () => {
        "use server"
        await signIn("kakao")
      }}
    >
      <button className={styles.kakaoSignin} type="submit">Kakao로 로그인하기</button>
    </form>
  )
}