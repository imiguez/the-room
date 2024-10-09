'use client'

import styles from "./chats.module.css";
import { ChatsContainer } from "./components/ChatsContainer";


export default function ChatsPage() {
  

  return (
    <>
      <h2 className={styles.title}>Chats</h2>
      <ChatsContainer/>
    </>
  );
}