import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

function ModalForm({ isOpen, onClose, title, onSubmit, children }) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: 4,
          width: '400px',
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <form onSubmit={onSubmit}>
          {children}
          <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
            {title}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default ModalForm;
