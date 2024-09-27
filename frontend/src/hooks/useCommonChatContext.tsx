import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";


export const CommonChatContext = createContext<{
  socket: Socket,
  setSocket: (socket: Socket) => void,
} | null>(null);

export const useCommonChatContext = () => {
  return useContext(CommonChatContext);
};