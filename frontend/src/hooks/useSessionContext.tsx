import Nav from "app/components/Nav";
import { usePathname } from "next/navigation";
import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { SessionUser } from "types/users.type";


export const SessionContext = createContext<{
  session: SessionUser | null,
  setSession: (session: SessionUser|null) => void,
} | null>(null);

export const SessionContextWrapper: FC<{children: ReactNode|ReactNode[]}> = ({ children }) => {
  const [session, setSession] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathname = usePathname();

  useEffect(() => {
    // When an endpoint is manually fetched, this function will be triggered.
    const fetchSession = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/session`);
      const json = await res.json();
      setSession(json.session);
      setIsLoading(false);
    };
    fetchSession();
  }, []);

  if (isLoading) return <span className='loader pageLoader' />;

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {session && pathname != '/' && <Nav/>}
      {children}
    </SessionContext.Provider>
  )
}

export const useSessionContext = () => {
  return useContext(SessionContext);
};
