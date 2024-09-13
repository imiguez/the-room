'use server'

import LogInBtn from "components/LogInBtn";
import { getSession } from "cookie-handler";
import styles from "./page.module.css";

export default async function Home() {
  const session = await getSession();

  return (
    <main className={'main'}>
      <h1 className={styles.title}>The Room</h1>

      <LogInBtn session={session} />
    </main>
  );
}
