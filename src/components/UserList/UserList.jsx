import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserList.module.css';
import UserCard from '../UserCard/UserCard';

function UserList() {
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);

  useEffect(() => {
    axios
      .get('https://645a157995624ceb21f71e2a.mockapi.io/RESTAPI/users')
      .then((response) => {
        setUsers(response.data);
        setVisibleUsers(response.data.slice(0, 3));
        if (response.data.length <= 3) {
          setLoadMoreVisible(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLoadMore = () => {
    const nextIndex = visibleUsers.length;
    const nextUsers = users.slice(nextIndex, nextIndex + 3);
    const newVisibleUsers = visibleUsers.concat(nextUsers);
    setVisibleUsers(newVisibleUsers);
    if (newVisibleUsers.length === users.length) {
      setLoadMoreVisible(false);
    }
  };

  const handleFollowersChange = (userId, delta) => {
    axios
      .patch(
        `https://645a157995624ceb21f71e2a.mockapi.io/RESTAPI/users/${userId}`,
        { followers: delta }
      )
      .then((response) => {
        setUsers((prevUsers) => {
          const userIndex = prevUsers.findIndex((user) => user.id === userId);
          if (userIndex !== -1) {
            const updatedUser = response.data;
            return [
              ...prevUsers.slice(0, userIndex),
              updatedUser,
              ...prevUsers.slice(userIndex + 1),
            ];
          }
          return prevUsers;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.userListContainer}>
      <div className={styles.userListWrapper}>
        <div className={styles.userList}>
          {visibleUsers.map((user, index) => (
            <UserCard
              key={user.id}
              user={user}
              onFollowersChange={handleFollowersChange}
            />
          ))}
        </div>
      </div>
      {loadMoreVisible && (
        <button className={styles.loadMoreButton} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
}
export default UserList;
