import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

// ✅ Always define the context first
const SocketContext = createContext(null);

// ✅ Create a single socket instance (environment safe)
const socket = io(import.meta.env.VITE_BASE_URL, {
  transports: ['websocket'],
});

const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.on('connect', () => console.log('✅ Socket connected:', socket.id));
    socket.on('disconnect', () => console.log('❌ Socket disconnected'));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// ✅ Default + Named Export
export { SocketContext };
export default SocketProvider;
