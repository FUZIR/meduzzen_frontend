import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation, withTranslation } from 'react-i18next';

const statusLabels = {
  PD: 'Pending',
  AC: 'Accepted',
  RJ: 'Rejected',
  RV: 'Revoked',
  CD: 'Canceled',
};

function BaseCard({ title, onAccept, onReject, status, labels }) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        border: status === 'AC' ? '1px solid green' : status === 'RJ' || status === 'RV' || status === 'CD' ? '1px solid red' : '1px solid black',
        borderRadius: 2,
        padding: 2,
        backgroundColor: '#f9f9f9',
        marginBottom: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.01)', boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        },
      }}>
      <Typography>{t(labels.title)}: {title}</Typography>
      {status === 'PD' ? (
        <Box>
          <Button sx={{ marginLeft: 1 }} color="success" onClick={onAccept}>
            {t(labels.acceptButton)}
          </Button>
          <Button sx={{ marginLeft: 1 }} color="error" onClick={onReject}>
            {t(labels.rejectButton)}
          </Button>
        </Box>
      ) : (
        <Typography sx={{
          marginLeft: 1,
          fontStyle: 'italic',
          color: status === 'AC' ? 'green' : status === 'RJ' || status === 'CD' ? 'red' : 'black',
          fontWeight: 'bold',
        }}>
          {t(statusLabels[status])}
        </Typography>
      )}
    </Box>
  );
}

export default withTranslation()(BaseCard);
