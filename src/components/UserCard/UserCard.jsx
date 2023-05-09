import { useState, useEffect, useCallback } from 'react';
import styles from './UserCard.module.css';
import logo from '../../images/logo.png';
import pictures from '../../images/pictures.png';
import line from '../../images/line.png';
import ellips from '../../images/ellipse.png';
import boy from '../../images/boy.png';

function UserCard({ user, onFollowersChange }) {
  const [following, setFollowing] = useState(() => {
    const followingState = localStorage.getItem(`following-${user.id}`);
    return followingState !== null ? JSON.parse(followingState) : false;
  });
  const [followers, setFollowers] = useState(user.followers);

  const handleFollowClick = useCallback(() => {
    if (!following) {
      setFollowing(true);
      setFollowers(prevFollowers => prevFollowers + 1);
      localStorage.setItem(`following-${user.id}`, JSON.stringify(true));
      onFollowersChange(user.id, 1);
    } else {
      setFollowing(false);
      setFollowers(prevFollowers => prevFollowers - 1);
      localStorage.setItem(`following-${user.id}`, JSON.stringify(false));
      onFollowersChange(user.id, -1);
    }
  }, [following, user.id, onFollowersChange]);

  useEffect(() => {
    const followersState = localStorage.getItem(`followers-${user.id}`);
    if (followersState !== null) {
      setFollowers(JSON.parse(followersState));
    }
  }, [user.id]);

  useEffect(() => {
    localStorage.setItem(`followers-${user.id}`, JSON.stringify(followers));
  }, [followers, user.id]);

  return (
    <div className={styles['user-card']}>
      <img src={logo} alt="logo" className={styles.logo} />
      <div className={styles['user-card-container']}>
        <img src={pictures} alt="pictures" className={styles.pictures} />
        <h3>{user.name}</h3>
      </div>
      <div className={styles['user-avatar-container']}>
        <div className={styles['avatar-line-container']}>
          <img src={line} alt="line" className={styles.line} />
          <img src={ellips} alt="ellips" className={styles.ellips} />
        </div>
        <img className={styles.avatar} img src={boy} alt="avatar" />
        
      </div>
      <div className={styles['user-info']}>
        <p>{user.tweets} tweets</p>
        <p>{followers.toLocaleString('en-US')} followers</p>
        <button className={following ? styles.following : styles.follow} onClick={handleFollowClick}>
          {following ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  );
}

export default UserCard;
