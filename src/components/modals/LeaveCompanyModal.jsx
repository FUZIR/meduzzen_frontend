import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from './Modal.jsx';
import { Box } from '@mui/material';
import { withTranslation } from 'react-i18next';

function LeaveCompanyModal({ isOpen, handleClose, onLeaveCompany, t }) {
  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      title=""
      description={t('leave_company_modal_description')}
    >
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={onLeaveCompany}>
          {t('delete_profile_modal_yes')}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          {t('delete_profile_modal_no')}
        </Button>
      </Box>
    </Modal>
  );
}

export default withTranslation()(LeaveCompanyModal);