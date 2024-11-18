import React, { useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, CircularProgress, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserState } from '../../stores/selectors.js';
import { withTranslation } from 'react-i18next';
import { fetchUserById } from '../../features/thunks/usersThunks.js';

function UserInfo({ t }) {
  const { id } = useParams();
  const userId = parseInt(id);
  const dispatch = useDispatch();
  const { currentUser: user, loading: loading } = useSelector(selectUserState);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserById({ userId }));
    }
  }, [userId, user, dispatch]);

  if (loading === 'pending') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size="3rem" />
      </Box>
    );
  }
  if (!user) {
    return <Typography variant="h6" color={'error'} align={'center'}>User not found</Typography>;
  }
  return (
    <Box>
      <Header />
      <Container maxWidth={'md'} sx={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Card sx={{ width: '40vw', maxWidth: 500 }}>
          <CardMedia
            component="img"
            height="300"
            image={user.image_path ? user.image_path : 'https://m0.a-shop.com/pub/media/catalog/product/cache/919f1b96b31b31e0fef65e4769f00b6a/9/f/9fc0f561-f5f5-48e2-b954-deff7d93dc5f.jpg'}
            alt={`${user.username}`}
          />
          <CardContent>

            {user.first_name && user.last_name ?
              <Typography variant="h5" component="div" gutterBottom>{user.first_name} {user.last_name}</Typography> :
              <Typography variant="h5" component="div" gutterBottom>{user.username}</Typography>
            }

            {user.company ?
              <Typography variant="body1" color="text.secondary">
                {t('account_menu_companies')}: {user.company}
              </Typography> :
              <Typography variant="body1" color="text.secondary">
                {t('account_menu_companies')}: unemployed
              </Typography>
            }
            <Typography variant="body1" color="text.secondary">
              {t('login_email')}: {user.email}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default withTranslation()(UserInfo);