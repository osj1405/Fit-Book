// import Image from "next/image";
import KakaoSignIn from "@/components/kakaoSignin";
import styles from "../styles/login.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>Fit Book</h1>
      <KakaoSignIn />
    </div>
  );
}
