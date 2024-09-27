import { createContext, useContext } from "react";
import { Message } from "types/messages.type";


export const MsgsContext = createContext<{
  msgs: Message[],
  setMsgs: (fn: (prevMsgs: Message[]) => Message[]) => void,
} | null>(null);

export const useMsgsContext = () => {
  return useContext(MsgsContext);
};