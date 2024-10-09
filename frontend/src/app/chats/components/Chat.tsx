import { FC } from "react"
import { Message } from "types/messages.type"
import { formatChatDate } from "utils/date-parser.util"
import styles from "../chats.module.css";



export const Chat: FC<Message> = ({ _id, author, content, date }) => {

  return (
    <div className={styles.chatContainer}>
      <img src={author.imageUrl} className={`profileImg ${styles.profileImg}`} loading="lazy"/>
      <div className={`commonMessageContainer ${styles.messageContainer}`}>
        <div className={styles.nameAndDateContainer}>
          <h4 className={styles.name}>{author.firstName + ' ' + author.lastName}</h4>
          <p className={`date ${styles.date}`}>{formatChatDate(date)}</p>
        </div>
        <div className={styles.lastMessageAndCount}>
          <p className={`message ${styles.lastMessage}`}>{content}</p>
          <p className={styles.messagesCount}>{content.includes('1') ? 294836249 : content.includes('2') ? 294836249 : 100}</p>
        </div>
      </div>
    </div>
  )
}