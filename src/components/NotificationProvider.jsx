import React, { createContext, useEffect, useState } from 'react';
import Notification from './Notification.jsx';
import { socket } from '../api/socket.js';

const NotificationContext = createContext({
  notification: { open: false, message: '' },
  handleOpen: () => {
  },
  handleCloseNotification: () => {
  },
});

function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({ open: false, message: '' });
  const [isConnected, setIsConnected] = useState(socket.readyState === WebSocket.OPEN);
  const [error, setError] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const handleOpen = (message) => {
    setNotification({ open: true, message });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleErrorClose = () => {
    setError(null);
    setIsErrorOpen(false);
  };

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleOpen(data.message);
      } catch (error) {
        setError(error.message);
        setIsErrorOpen(true);
      }
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
      {error && (
        <Notification message={error} isOpen={isErrorOpen} onClose={handleErrorClose} />
      )}
      <Notification
        message={notification.message}
        isOpen={notification.open}
        onClose={handleCloseNotification}
      />
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
