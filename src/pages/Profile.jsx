import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, CircularProgress, Container, Typography } from '@mui/material';
import Header from '../components/Header.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId, selectUserState } from '../stores/selectors.js';
import { getToken } from '../utils/Storage.js';
import { parseDate } from '../utils/dateParser.js';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import DeleteProfileModal from '../components/DeleteProfileModal.jsx';
import { Requests } from '../api/Requests.js';
import axios from '../api/Axios.js';
import { fetchUserById } from '../features/thunks/usersThunks.js';

function Profile({ t }) {
  const requests = new Requests(axios);
  const dispatch = useDispatch();
  const userId = parseInt(useSelector(selectUserId));
  const { currentUser: user, loading: loading } = useSelector(selectUserState);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onDeleteProfile = () => {
    requests.patchUserInfo(userId, { 'visible': false });
    setModalIsOpen(false);
  };

  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => setModalIsOpen(false);

  useEffect(() => {
    dispatch(fetchUserById({ userId: userId }));
  }, [dispatch, userId]);

  if (loading === 'pending' || !user) {
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

  return (
    <Container maxWidth="md">
      <Header />
      <DeleteProfileModal isOpen={modalIsOpen} handleClose={handleCloseModal} onDeleteProfile={onDeleteProfile} />
      <Box display="flex" alignItems="center" flexDirection="column" marginTop={4}>
        <Avatar sx={{ width: 100, height: 100 }} src={user.image_path} alt="User Avatar">{user.first_name[0]}</Avatar>

        {user.first_name && user.last_name ?
          (<Typography variant="h4" mt={2}>{user.first_name} {user.last_name}</Typography>) :
          (<Typography variant="h4" mt={2}>{user.username}</Typography>)
        }
        <Typography variant="subtitle1" color="textSecondary">{user.email}</Typography>
      </Box>

      <Box mt={4} mb={4}>
        <Typography variant="h5" gutterBottom>{t('profile_main_section')}</Typography>
        <Card sx={{ height: '30vh' }}>
          <CardContent>
            <Typography variant="body1">{t('profile_username')} {user.username}</Typography>
            <Typography variant="body1">{t('profile_description')} {user.description}</Typography>
            <Typography variant="body1">{t('profile_register_date')} {parseDate(user.created_at)}</Typography>
            {user.country ? (<Typography variant="body1">{t('profile_country')} {user.country} </Typography>) : <></>}

          </CardContent>
        </Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" color="primary" sx={{ mt: 1 }}
                    component={Link} to={'/profile/update_info'}>{t('profile_change_button')}</Button>
            <Button variant="outlined" color="error" sx={{ mt: 1 }}
                    onClick={handleOpenModal}>{t('profile_delete_button')}</Button>
          </Box>
        </CardContent>
      </Box>
    </Container>
  );
}

export default withTranslation()(Profile);