'use client'

import { sendMessage } from 'app/chat/actions';
import React, { FC, useState } from 'react'

interface IMessageImput {
  styles: {
    readonly [key: string]: string;
  },
}

export const MessageImput: FC<IMessageImput> = ({ styles }) => {
  const [message, setMessage] = useState<string>('')
  const onTextChange = (e: any) => {
    setMessage(e.target.value);
  }
  return (
    <form className={styles.messageForm} action={
      async () => {
        if (await sendMessage({ content: message })) setMessage('');
      }
    }>
      <input type="text" placeholder="Send a message..." className={styles.messageInput} onChange={onTextChange} value={message}/>
      <button type="submit" className={styles.messageFormBtn} disabled={ message == '' }><i className="bi bi-arrow-right-circle-fill"></i></button>
    </form>
  )
}

export default MessageImput