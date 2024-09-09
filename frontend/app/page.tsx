'use client'

import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {

  const handleGoogleLogin = () => window.location.href = '/api/auth/google/login';

  return (
    <main className={'main'}>
      <h1 className={'title'}>The Room</h1>
      <button onClick={handleGoogleLogin} className={styles.googleAuthBtn}>
        <Image src={'https://goodies.icons8.com/web/common/social/social_google.svg'} className={styles.googleIcon} width={20} height={20} alt={"Google Logo"}/>
        Continue with Google
      </button>
    </main>
  );
}
