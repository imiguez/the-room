'use client'

import { useEffect, useState } from "react";
import styles from "../chats.module.css";
import { Message } from "types/messages.type";
import { getLastChats } from "../actions";
import { Chat } from "./Chat";

export const ChatsContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chats, setChats] = useState<Message[]>();

  useEffect(() => {
    const fetchLastChats = async () => {
      let from = new Date();
      from.setHours(from.getHours()-44);
      const response = await getLastChats(from);
      if (!response) return;
      setChats(response.messages);
      setIsLoading(false);
    }

    fetchLastChats();
  }, []);

  return (
    <section className={`scrollMessagesContainer ${styles.chatsContainer}`}>
      {isLoading && <span className={`loader chatLoader`} />}

      {chats?.map((chat, i) => <Chat {...chat}/>)}
    </section>
  )
}