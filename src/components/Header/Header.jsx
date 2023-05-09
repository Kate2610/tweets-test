import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  const location = useLocation();

  return (
    <header className={styles.container}>
      <nav>
        {location.pathname !== '/' && (
          <Link to="/" className={styles.link}>
            Home
          </Link>
        )}
        {location.pathname !== '/tweets' && (
          <Link to="/tweets" className={styles.link}>
            Tweets
          </Link>
        )}
      </nav>
      {location.pathname !== '/' && (
        <Link to="/" className={styles.link}>
          Back
        </Link>
      )}
    </header>
  );
}

export default Header;
