'use server'

import { getSession } from "cookie-handler";
import styles from "./page.module.css";
import LogInBtn from "./components/LogInBtn";

export default async function Home() {
  const session = await getSession();

  return (
    <main className={'main'}>
      <h1 className={styles.title}>The Room</h1>

      <LogInBtn session={session} />
    </main>
  );
}
