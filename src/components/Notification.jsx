import React from 'react';
import { Snackbar } from '@mui/material';

function Notification({ message, isOpen, onClose }) {
  return (
    <Snackbar open={isOpen}
              autoHideDuration={5000}
              onClose={onClose}
              message={message}
    />
  );
}

export default Notification;