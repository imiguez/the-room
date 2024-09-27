'use client'

import React, { FC, FormEvent, useState } from 'react'
import styles from "../page.module.css";
import { Message } from 'types/messages.type';
import { useMsgsContext } from 'hooks/useMsgsContext';
import { useCommonChatContext } from 'hooks/useCommonChatContext';
import { useSessionContext } from 'hooks/useSessionContext';


export const MessageInput: FC = () => {
  const [message, setMessage] = useState<string>('');

  const { setMsgs } = useMsgsContext()!;
  const { socket } = useCommonChatContext()!;
  const { session } = useSessionContext()!;

  const onTextChange = (e: any) => {
    setMessage(e.target.value);
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    const res: Message | null = await socket.emitWithAck('send-message', {
      content: message,
      author: session?._id,
    });
    if (res) setMsgs((prevMsgs) => [res, ...prevMsgs]);
  }

  return (
    <form className={styles.messageForm} onSubmit={async (e) => await onSubmit(e)}>
      <input type="text" placeholder="Send a message..." className={styles.messageInput} onChange={onTextChange} value={message}/>
      <button type="submit" className={styles.messageFormBtn} disabled={ message == '' } 
        style={{ color: message !== '' ? 'blueviolet' : 'grey' }}><i className="bi bi-arrow-right-circle-fill"></i></button>
    </form>
  )
}

export default MessageInput