'use client'

import React, { FC, useState } from 'react';
import Image from 'next/image';
import { SessionUser } from 'types/users.type';
import { useRouter } from 'next/navigation';

interface INav {
  session: SessionUser | null,
  styles: {
    readonly [key: string]: string;
  },
}

const Nav: FC<INav> = ({ session, styles }) => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`);
    router.refresh(); // Triggers a re-render and fetches fresh session data
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.imageContainer}>
        {session ? 
          <Image src={session.imageUrl} width={70} height={70} alt="profile-image" onClick={() => setClicked(!clicked)}/> 
          : 
          <i className="bi bi-person-circle"onClick={() => setClicked(!clicked)}/>
        }
      </div>
      {clicked &&
        <ul className={styles.navOptionsContainer}>
          <li className={styles.navOptions} onClick={async () => await handleLogout()}>
            <i className="bi bi-box-arrow-left" /> 
            Log out
            </li>
        </ul>
      }
    </nav>
  );
};

export default Nav;
