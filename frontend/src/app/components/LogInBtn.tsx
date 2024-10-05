'use client'

import React, { FC, useEffect, useState } from 'react'
import Image from "next/image";
import styles from "app/page.module.css";
import { useSessionContext } from 'hooks/useSessionContext';
import Link from 'next/link';


const LogInBtn: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { session, setSession } = useSessionContext()!;
  
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

  const handleGoogleLogin = () => window.location.href = '/api/auth/google/login';
  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`);
    window.location.href = '/';
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {!session ? (
        <button onClick={handleGoogleLogin} className={styles.googleAuthBtn}>
          <Image src={'https://goodies.icons8.com/web/common/social/social_google.svg'} className={styles.googleIcon} width={20} height={20} alt={"Google Logo"}/>
          Continue with Google
        </button>
        ) : (
        <>
          <button onClick={async () => await handleLogout()} className={styles.optionsBtns}>
            Log out
            <i className="bi bi-box-arrow-left"></i>
          </button>

          <Link href={'/chat'} className={styles.optionsBtns}>
            Go to the chat
            <i className="bi bi-chat-right-dots-fill" id={styles.chatIcon}></i>
          </Link>
        </>
      )}
    </>
  )
}

export default LogInBtn