'use client'

import { sendMessage } from 'app/chat/actions';
import React, { FC, useState } from 'react'
import styles from "../page.module.css";


export const MessageImput: FC = () => {
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
      <button type="submit" className={styles.messageFormBtn} disabled={ message == '' } 
        style={{ color: message !== '' ? 'blueviolet' : 'grey' }}><i className="bi bi-arrow-right-circle-fill"></i></button>
    </form>
  )
}

export default MessageImput