import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header.jsx';
import { useNavigate } from 'react-router-dom';

function Main() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Box>
      <Header />
      <Container maxWidth={'md'} sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Typography variant={'h3'} align={'center'} color={'primary'} mb={4}>
          {t('main_page_welcome')}
        </Typography>
        <Button size={'large'} variant={'outlined'} onClick={() => navigate('/login')}>
          {t('main_page_start_button')}
        </Button>
      </Container>
    </Box>
  );
}

export default Main;