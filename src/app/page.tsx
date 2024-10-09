import KakaoSignIn from "@/components/KaKaoSignIn";
import styles from "../styles/login.module.css";
import NaverSignIn from "@/components/NaverSignIn";

export default function Home() {


  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>Fit Book</h1>
      <KakaoSignIn />
      <NaverSignIn />
    </div>
  );
}
