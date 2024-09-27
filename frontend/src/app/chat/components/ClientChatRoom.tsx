'use client'

import { FC, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SessionUser } from "types/users.type";
import { ChatContainer } from "./ChatContainer";
import MessageInput from "./MessageInput";
import Nav from "./Nav";
import { Message } from "types/messages.type";
import styles from "../page.module.css";
import { useLogout } from "hooks/useLogout";
import { MsgsContext } from "hooks/useMsgsContext";
import { CommonChatContext } from "hooks/useCommonChatContext";
import { SessionContext } from "hooks/useSessionContext";


export const ClientChatRoom: FC<{session: SessionUser | null}> = ({ session }) => {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket>();
  const { logout } = useLogout();


  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/common-chat`, {
      transports: ['websocket'],
      withCredentials: true, // Include cookies in the request
    });

    setSocket(socket);

    socket.on('connect', () => {
      console.log('CONNECTED');
    });
    socket.on('connect_error', (error: any) => {
      console.log('ERROR:', error);
    });
    socket.on('auth_error', async (error: any) => {
      console.log('AUTH ERROR:', error);
      await logout();
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('auth_error');
      socket.disconnect();
    }
  }, []);

  if (!socket) {
    return <span className={`${styles.loader} ${styles.pageLoader}`} />;
  } else {
    return (
      <SessionContext.Provider value={session ? { session } : null}>
        <CommonChatContext.Provider value={{ socket, setSocket }}>
          <MsgsContext.Provider value={{ msgs, setMsgs }}>
            <Nav/>
            <ChatContainer/>
            <MessageInput/>
          </MsgsContext.Provider>
        </CommonChatContext.Provider>
      </SessionContext.Provider>
    )
  }
}
