import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, CircularProgress, Container, Typography } from '@mui/material';
import Header from '../components/Header.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompaniesState, selectUserId, selectUserState } from '../stores/selectors.js';
import { parseDate } from '../utils/dateParser.js';
import { withTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import DeleteProfileModal from '../components/modals/DeleteProfileModal.jsx';
import { Requests } from '../api/requests.js';
import axios from '../api/axios.js';
import { fetchUserById } from '../features/thunks/usersThunks.js';
import LeaveCompanyModal from '../components/modals/LeaveCompanyModal.jsx';
import { fetchCompanies } from '../features/thunks/companiesThunks.js';
import CreateCompanyModal from '../components/modals/CreateCompanyModal.jsx';
import { getToken } from '../utils/Storage.js';
import UserAveragesByIdChart from '../components/UserAveragesByIdChart.jsx';
import QuizHistoryCard from '../components/QuizHistoryCard.jsx';

function Profile({ t }) {
  const requests = new Requests(axios);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = parseInt(useSelector(selectUserId));
  const { entities: companies } = useSelector(selectCompaniesState);
  const { currentUser: user, loading: loading } = useSelector(selectUserState);
  const [createCompanyModalIsOpen, setCreateCompanyModalIsOpen] = useState(false);
  const [deleteProfileModalIsOpen, setDeleteProfileModalIsOpen] = useState(false);
  const [leaveCompanyModalIsOpen, setLeaveCompanyModalIsOpen] = useState(false);
  const owned_companies = companies.filter((company) => company.owner === userId);
  const [userRating, setUserRating] = useState({});
  const [userQuizzesHistory, setUserQuizzesHistory] = useState([]);

  const onDeleteProfile = () => {
    requests.patchUserInfo(userId, { 'visible': false });
    setDeleteProfileModalIsOpen(false);
  };

  const onLeaveCompany = () => {
    requests.leaveCompany();
    setLeaveCompanyModalIsOpen(false);
  };

  const handleOpenCreateCompanyModal = () => setCreateCompanyModalIsOpen(true);
  const handleCloseCreateCompanyModal = () => setCreateCompanyModalIsOpen(false);

  const handleOpenDeleteProfileModal = () => setDeleteProfileModalIsOpen(true);
  const handleCloseDeleteProfileModal = () => setDeleteProfileModalIsOpen(false);

  const handleOpenLeaveCompanyModal = () => setLeaveCompanyModalIsOpen(true);
  const handleCloseLeaveCompanyModal = () => setLeaveCompanyModalIsOpen(false);

  const handleExportResults = async () => {
    await requests.getUserResultsCsv(userId);
  };
  useEffect(() => {
    const token = getToken();
    requests.getUsersRating().then((response) => {
      const user = response.data.find((user) => user.user.id === userId);
      setUserRating(user);
    });
    if (!token) {
      navigate('/login');
    } else {
      dispatch(fetchUserById({ userId }));
      dispatch(fetchCompanies());
      requests.getUserQuizzesHistory().then((response) => {
        setUserQuizzesHistory(response.data);
      });
    }
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
      <CreateCompanyModal isOpen={createCompanyModalIsOpen} onClose={handleCloseCreateCompanyModal} />
      <DeleteProfileModal isOpen={deleteProfileModalIsOpen} handleClose={handleCloseDeleteProfileModal}
                          onDeleteProfile={onDeleteProfile} />
      <LeaveCompanyModal isOpen={leaveCompanyModalIsOpen} handleClose={handleCloseLeaveCompanyModal}
                         onLeaveCompany={onLeaveCompany} />
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
            {user.description && (
              <Typography variant="body1">{t('profile_description')} {user.description}</Typography>)
            }
            <Typography variant="body1">{t('profile_register_date')} {parseDate(user.created_at)}</Typography>
            {user.country && (<Typography variant="body1">{t('profile_country')} {user.country} </Typography>)}
            {user.company && (
              <Typography variant="body1">{t('profile_company')} {user.company.name} </Typography>)
            }
            {owned_companies.length !== 0 && (
              <Typography variant="body1">
                {t('profile_owned_companies')}: {owned_companies.map((company) => company.name).join(', ')}
              </Typography>)
            }
            {userRating.average_score && (
              <Typography variant="body1">
                {t('profile_user_rating')}: {userRating.average_score}
              </Typography>
            )}
          </CardContent>
        </Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: 2, flexDirection: 'row' }}>
            <Button variant="contained" color="primary" sx={{ mt: 1 }}
                    component={Link} to={'/profile/update_info'}>{t('profile_change_button')}</Button>
            <Button variant="contained" color="primary" sx={{ mt: 1 }}
                    onClick={handleOpenCreateCompanyModal}>{t('profile_create_company_button')}</Button>
            <Button variant="contained" color="primary" sx={{ mt: 1 }}
                    onClick={handleExportResults}>{t('profile_export_results_button')}</Button>
            <Button variant="outlined" color="error" sx={{ mt: 1 }}
                    onClick={handleOpenDeleteProfileModal}>{t('profile_delete_button')}</Button>
            {user.company &&
              (<Button variant="outlined" color="error" sx={{ mt: 1 }}
                       onClick={handleOpenLeaveCompanyModal}>{t('company_leave_button')}</Button>)
            }
          </Box>
          <UserAveragesByIdChart user_id={userId} />
          <Typography variant={'h4'} color={'primary'} align={'center'} mt={4}>
            {t('profile_user_quizzes_history')}
          </Typography>
          <QuizHistoryCard quizData={userQuizzesHistory} />
        </CardContent>
      </Box>
    </Container>
  );
}

export default withTranslation()(Profile);