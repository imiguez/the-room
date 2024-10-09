import { FC, memo } from "react";
import { Message } from "types/messages.type";
import { formatMessageDate } from "utils/date-parser.util";
import styles from "../chat.module.css";


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
        <div className={`commonMessageContainer ${styles.messageContainer}`}>
          <h4>{`${msg.author.firstName} ${msg.author.lastName}`}</h4>
          <p className={`message ${styles.message}`}>{msg.content}</p>
          <p className={'date'}>{formatMessageDate(msg.date)}</p>
        </div>
      </>
    </div>
  )
});