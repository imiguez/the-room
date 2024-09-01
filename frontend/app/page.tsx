'use client'

import { onClick } from "./actions";
import styles from "./page.module.css";

export default function Home() {

  const p = async () => {
    try {
      const res = await fetch('http://127.0.0.1:3000/api/p');
      const arr = await res.json();
      console.log(arr)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>The Room</h1>
      <button onClick={async () => onClick()}>pressme</button>
    </main>
  );
}
