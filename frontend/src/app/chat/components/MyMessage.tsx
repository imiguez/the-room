import { FC, memo } from "react";
import styles from "../chat.module.css";
import { Message } from "types/messages.type";
import { formatMessageDate } from "utils/date-parser.util";

interface IMyMessage {
  msg: Message,
}

// eslint-disable-next-line react/display-name
export const MyMessage: FC<IMyMessage> = memo(({ msg }) => {
  return (
    <div className={styles.myMessageContainer}>
      <div className={`commonMessageContainer ${styles.messageContainer}`}>
        <h4>You</h4>
        <p className={`message ${styles.message}`}>{msg.content}</p>
        <p className={'date'}>{formatMessageDate(msg.date)}</p>
      </div>
      <span className={styles.rightTriangle} />
    </div>
  )
});