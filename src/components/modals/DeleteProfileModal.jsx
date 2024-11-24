import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from './Modal.jsx';
import { Box } from '@mui/material';
import { withTranslation } from 'react-i18next';

function DeleteProfileModal({ isOpen, handleClose, onDeleteProfile, t }) {
  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      title=""
      description={t('delete_profile_modal_description')}
    >
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={onDeleteProfile}>
          {t('delete_profile_modal_yes')}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          {t('delete_profile_modal_no')}
        </Button>
      </Box>
    </Modal>
  );
}

export default withTranslation()(DeleteProfileModal);