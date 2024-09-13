'use server'

import styles from "./page.module.css";
import Nav from "components/Nav";
import { getSession } from "cookie-handler";
import MessageImput from "components/MessageInput";


export default async function ChatRoom() {
  const session = await getSession();

  return (
    <main className={'main'}>
      <Nav session={session} styles={styles}/>

      <section className={styles.scrollMessagesContainer} >

      </section>
      <MessageImput styles={styles}/>

    </main>
  );
}