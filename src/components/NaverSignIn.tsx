import { signIn } from "@/auth"
import styles from "../styles/NaverSignIn.module.css"

export default function NaverSignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("naver")
      }}
    >
      <button className={styles.naverSignIn} type="submit">Naver로 로그인하기</button>
    </form>
  )
} 