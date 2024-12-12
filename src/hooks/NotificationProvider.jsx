import React, { createContext, useEffect, useState } from 'react';
import Notification from '../components/Notification.jsx';
import { getToken } from '../utils/Storage.js';

const URL = `ws://localhost:8000/ws/notifications/?token=${getToken()}`;
export const socket = new WebSocket(URL);

const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({ open: false, message: '' });
  const [isConnected, setIsConnected] = useState(socket.readyState === WebSocket.OPEN);

  const handleOpen = (message) => {
    setNotification({ open: true, message });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onMessage = (event) => {
      const data = JSON.parse(event.data);
      handleOpen(data.message);
    };


    socket.addEventListener('open', onConnect);
    socket.addEventListener('close', onDisconnect);
    socket.addEventListener('message', onMessage);

    return () => {
      socket.removeEventListener('open', onConnect);
      socket.removeEventListener('close', onDisconnect);
      socket.removeEventListener('message', onMessage);
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notification, handleOpen, handleCloseNotification }}>
      {children}
      <Notification message={notification.message} onOpen={notification.open} onClose={handleCloseNotification} />
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
