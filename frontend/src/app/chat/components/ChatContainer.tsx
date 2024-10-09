'use client'

import { FC, UIEvent, useEffect, useRef, useState } from "react";
import styles from "../chat.module.css";
import { getMessages } from "../actions";
import { PeopleMessage } from "./PeopleMessage";
import { MyMessage } from "./MyMessage";
import { useMsgsContext } from "hooks/useMsgsContext";
import { useCommonChatContext } from "hooks/useCommonChatContext";
import { Message } from "types/messages.type";
import { useSessionContext } from "hooks/useSessionContext";


export const ChatContainer: FC = () => {
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  
  const [unreadMsgs, setUnreadMsgs] = useState<boolean>(false);
  const renderUnreadMsgsBtnRef = useRef<boolean>(false);

  const scrollContainerRef = useRef<HTMLElement>(null);
  const lastMessageDate = useRef<Date>();

  const { msgs, setMsgs } = useMsgsContext()!;
  const { socket } = useCommonChatContext()!;
  const { session } = useSessionContext()!;
  
  useEffect(() => {
    socket.on('new-message', (msg: Message) => {
      if (scrollContainerRef.current) {
        const { scrollTop } = scrollContainerRef.current;
        renderUnreadMsgsBtnRef.current = scrollTop < -5;
      }
      setMsgs((prevMsgs) => [msg, ...prevMsgs]);
    });
    
    const firstLoad = async () => {
      await loadMore(true);
      setLoading(false);
    };
    
    firstLoad();
    return () => {
      socket.off('new-message');
    }
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      if (renderUnreadMsgsBtnRef.current) {
        setUnreadMsgs(true);
      } else {
        scrollContainerRef.current?.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }
  }, [msgs]);

  const loadMore = async (isFirstLoad: boolean = false) => {
    const data = await getMessages(lastMessageDate.current ?? new Date());
    if (!data) return;
    const {messages, hasMorePages} = data;
    if (messages.length > 0) {
      if (!isFirstLoad) renderUnreadMsgsBtnRef.current = true;
      setMsgs((prevMsgs) => [...prevMsgs, ...messages]);
      lastMessageDate.current = messages[messages.length - 1].date;
    }
    setHasMorePages(hasMorePages);
  }

  const onClickLoadMore = async () => {
    setLoadingMore(true);
    await loadMore();
    setLoadingMore(false);
  }
  
  const onContainerScroll = (e: UIEvent<HTMLElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (unreadMsgs && scrollTop > -5) setUnreadMsgs(false);
    if (!unreadMsgs && scrollTop <= -5) setUnreadMsgs(true);
  }

  const onUnreadMsgsBtnClick = () =>  {
    scrollContainerRef.current?.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }

  return (
    <section className={'scrollMessagesContainer'} ref={scrollContainerRef} onScroll={(e) => onContainerScroll(e)}>
      {unreadMsgs && <button onClick={onUnreadMsgsBtnClick} className={styles.unreadMsgsBtn}><i className="bi bi-arrow-down-short"/></button>}

      {
        msgs.map((msg, i) => {
          if (msg.author._id === session?._id) return <MyMessage msg={msg} key={msg._id}/>
          else return <PeopleMessage msg={msg} key={msg._id}/>
        })
      }

      {loading && <span className={'loader chatLoader'} />}

      {!loading && loadingMore && <span className={'loader loadMoreLoader'} />}

      {!loading && !loadingMore && hasMorePages && <button onClick={async () => await onClickLoadMore()} className={styles.loadMoreBtn}>Load more</button>}
    </section>
  )
}