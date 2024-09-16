'use client'

import { FC, useEffect, useRef, useState } from "react";
import styles from "../page.module.css";
import { getMessages } from "../actions";
import { Message } from "types/messages.type";
import { PeopleMessage } from "./PeopleMessage";
import { SessionUser } from "types/users.type";
import { MyMessage } from "./MyMessage";

interface IChatContainer {
  session: SessionUser | null,
}

export const ChatContainer: FC<IChatContainer> = ({ session }) => {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const lastMessageDate = useRef<Date>();

  const loadMore = async () => {
    const data = await getMessages(lastMessageDate.current ?? new Date());
    if (!data) return;
    const {messages, hasMorePages} = data;
    if (messages.length > 0) {
      setMsgs([...msgs, ...messages]);
      lastMessageDate.current = messages[messages.length - 1].date;
    }
    setHasMorePages(hasMorePages);
  }

  const onClickLoadMore = async () => {
    setLoadingMore(true);
    await loadMore();
    setLoadingMore(false);
  }
  
  useEffect(() => {
    const firstLoad = async () => {
      await loadMore();
      setLoading(false);
    };

    firstLoad();

  }, []);

  return (
    <section className={styles.scrollMessagesContainer} >
      {
        msgs.map((msg, i) => {
          if (msg.author._id === session?._id || i%2 ==0) return <MyMessage msg={msg} key={msg._id}/>
          else return <PeopleMessage msg={msg} key={msg._id}/>
        })
      }

      {loading && <span className={`${styles.loader} ${styles.chatLoader}`} />}

      {!loading && loadingMore && <span className={`${styles.loader} ${styles.loadMoreLoader}`} />}

      {!loading && !loadingMore && hasMorePages && <button onClick={async () => await onClickLoadMore()} className={styles.loadMoreBtn}>Load more</button>}
    </section>
  )
}