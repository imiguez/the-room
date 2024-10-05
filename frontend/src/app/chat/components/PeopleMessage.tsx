import { FC, memo } from "react";
import { Message } from "types/messages.type";
import { formatDate } from "utils/date-parser.util";
import styles from "../page.module.css";


interface IPeopleMessage {
  msg: Message,
}

// eslint-disable-next-line react/display-name
export const PeopleMessage: FC<IPeopleMessage> = memo(({ msg }) => {

  return (
    <div className={styles.peopleMessageContainer}>
      <img src={msg.author.imageUrl} className={styles.profileImg} loading='lazy'/>
      
      <>
        <span className={styles.leftTriangle} />
        <div className={styles.messageContainer}>
          <h4>{`${msg.author.firstName} ${msg.author.lastName}`}</h4>
          <p className={styles.content}>{msg.content}</p>
          <p className={styles.date}>{formatDate(msg.date)}</p>
        </div>
      </>
    </div>
  )
});