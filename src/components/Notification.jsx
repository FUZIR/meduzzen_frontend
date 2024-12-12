import React from 'react';
import { Snackbar } from '@mui/material';

function Notification({ message, onOpen, onClose }) {
  return (
    <Snackbar open={onOpen}
              autoHideDuration={5000}
              onClose={onClose}
              message={message}
    />
  );
}

export default Notification;