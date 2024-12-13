import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import Header from '../components/Header.jsx';
import { Requests } from '../api/requests.js';
import axios from '../api/axios.js';
import { useTranslation, withTranslation } from 'react-i18next';
import { socket } from '../api/socket.js';

function Notifications() {
  const requests = new Requests(axios);
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]);

  const getNotifications = () => {
    requests.getUserNotifications().then((response) => {
      setNotifications(response.data);
    });
  };

  useEffect(() => {
    getNotifications();

    const handleSocketMessage = () => {
      getNotifications();
    };
    socket.addEventListener('message', getNotifications);

    return () => {
      socket.removeEventListener('message', handleSocketMessage);
    };
  }, []);

  const handleMarkNotification = async (id) => {
    await requests.markNotificationAsRead({ id });
    getNotifications();
  };
  return (
    <Box>
      <Header />
      <Container maxWidth={'md'}>
        <Typography variant={'h3'} color={'primary'} align={'center'}>
          {t('notifications_header')}
        </Typography>
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            {notifications.map((notification) => (
              <Grid item xs={12} key={notification.id}>
                <Card
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 2,
                    width: '100%',
                    backgroundColor: 'rgba(255,255,255,0.42)',
                    border: notification.status === 'AC' ? '1px solid red' : '1px solid black',
                  }}
                  onClick={() => handleMarkNotification(notification.id)}
                >
                  <CardContent
                    sx={{ flex: 1 }}>
                    <Typography variant="h6">
                      {notification.text}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('notification_create_time')}: {new Date(notification.created_at).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default withTranslation()(Notifications);