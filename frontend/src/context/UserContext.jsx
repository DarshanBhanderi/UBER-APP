import React, { useState, useEffect } from 'react';
import { UserDataContext } from './UserDataContext';

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore user when app loads
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
