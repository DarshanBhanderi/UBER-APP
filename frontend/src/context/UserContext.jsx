import React, { useState, useEffect } from 'react'
import { UserDataContext } from './UserDataContext'
import { getStoredSessionData } from '../lib/http'

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = getStoredSessionData('user')

    if (savedUser) {
      setUser(savedUser)
    }
  }, [])

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserContext
