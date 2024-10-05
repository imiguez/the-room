'use client'

import styles from "./page.module.css";
import LogInBtn from "./components/LogInBtn";

export default function Home() {
  return (
    <main className={'main'}>
      <h1 className={styles.title}>The Room</h1>

      <LogInBtn/>
    </main>
  );
}
