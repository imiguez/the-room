import { FC, memo } from "react";
import styles from "../page.module.css";

import { Message } from "types/messages.type";
import { formatDate } from "utils/date-parser.util";

interface IMyMessage {
  msg: Message,
}

// eslint-disable-next-line react/display-name
export const MyMessage: FC<IMyMessage> = memo(({ msg }) => {
  return (
    <div className={styles.myMessageContainer}>
      <div className={styles.messageContainer}>
        <h4>You</h4>
        <p className={styles.content}>{msg.content}</p>
        <p className={styles.date}>{formatDate(msg.date)}</p>
      </div>
      <span className={styles.rightTriangle} />
    </div>
  )
});