'use client';

import React, { FC, useState } from 'react';
import styles from '../page.module.css';
import { useLogout } from 'hooks/useLogout';
import { useSessionContext } from 'hooks/useSessionContext';

const Nav: FC = () => {
  const [clicked, setClicked] = useState(false);
  const { session } = useSessionContext()!;
  const { logout } = useLogout();

  return (
    <nav className={styles.nav}>
      <div className={styles.imageContainer}>
        <img src={session.imageUrl} width={70} height={70} alt="profile-image" onClick={() => setClicked(!clicked)} />
      </div>
      {clicked && (
        <ul className={styles.navOptionsContainer}>
          <li className={styles.navOptions} onClick={async () => await logout()}>
            <i className="bi bi-box-arrow-left" />
            Log out
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
