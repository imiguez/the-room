import { createContext, useContext } from "react";
import { SessionUser } from "types/users.type";


export const SessionContext = createContext<{
  session: SessionUser,
} | null>(null);

export const useSessionContext = () => {
  return useContext(SessionContext);
};
