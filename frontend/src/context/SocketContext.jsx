import React, { createContext, useEffect } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext(null)

const socket = io((import.meta.env.VITE_BASE_URL || '').replace(/\/+$/, ''), {
  transports: ['websocket'],
  withCredentials: true
})

const SocketProvider = ({ children }) => {
  useEffect(() => {
    const onConnect = () => {
      console.log('Socket connected:', socket.id)
    }

    const onDisconnect = () => {
      console.log('Socket disconnected')
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export { SocketContext }
export default SocketProvider
