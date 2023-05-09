import { useState, useEffect, useCallback } from 'react';
import styles from './UserCard.module.css';

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
      <img className={styles.avatar} src={user.avatar} alt="avatar" />
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
