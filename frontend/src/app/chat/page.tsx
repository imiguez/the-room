'use client'

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "types/messages.type";
import { useLogout } from "hooks/useLogout";
import { MsgsContext } from "hooks/useMsgsContext";
import { CommonChatContext } from "hooks/useCommonChatContext";
import { ChatContainer } from "./components/ChatContainer";
import MessageInput from "./components/MessageInput";


export default function ChatRoom() {
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

  if (!socket) return <span className={`loader pageLoader`} />;

  return (
    <CommonChatContext.Provider value={{ socket, setSocket }}>
      <MsgsContext.Provider value={{ msgs, setMsgs }}>
        <ChatContainer/>
        <MessageInput/>
      </MsgsContext.Provider>
    </CommonChatContext.Provider>
  )
}