'use client'

import React, { FC } from 'react'
import Image from "next/image";
import styles from "app/page.module.css";
import { useRouter } from 'next/navigation';
import { SessionUser } from 'types/users.type';

interface ILogInBtn {
  session: null | SessionUser,
}

const LogInBtn: FC<ILogInBtn> = ({ session }) => {
  const router = useRouter();

  const handleGoogleLogin = () => window.location.href = '/api/auth/google/login';
  const handleRedirectToChat = () => window.location.href = '/chat';
  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`);
    router.refresh(); // Triggers a re-render and fetches fresh session data
  }

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

          <button onClick={handleRedirectToChat} className={styles.optionsBtns}>
            Go to the chat
            <i className="bi bi-chat-right-dots-fill" id={styles.chatIcon}></i>
          </button>
        </>
      )}
    </>
  )
}

export default LogInBtn