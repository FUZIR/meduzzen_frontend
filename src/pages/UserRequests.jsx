import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Pagination, PaginationItem, Typography } from '@mui/material';
import Header from '../components/Header.jsx';
import { useTranslation, withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectRequestsState } from '../stores/selectors.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { fetchUserRequests } from '../features/thunks/requestsThunks.js';
import { resetRequestsState } from '../features/request/requestSlice.js';
import UserRequestsCard from '../components/UserRequestsCard.jsx';
import axios from '../api/axios.js';
import { Requests } from '../api/requests.js';

function UserRequests() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const requests = new Requests(axios);
  const { entities: userRequests, loading } = useSelector(selectRequestsState);
  const requestsPerPage = 6;
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * requestsPerPage;
  const endIndex = startIndex + requestsPerPage;
  const requestsToShow = userRequests.slice(startIndex, endIndex);
  const pageCount = Math.ceil(userRequests.length / requestsPerPage);

  useEffect(() => {
    dispatch(fetchUserRequests());

    return () => dispatch(resetRequestsState());
  }, [dispatch]);

  const handleCancel = async (id) => {
    await requests.requestsCancel({ id });
    dispatch(fetchUserRequests());
  };
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

  if (!userRequests || userRequests.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Header />
        <Typography variant="h6" color="textSecondary">{t('requests_error')}</Typography>
      </Box>
    );
  }
  return (
    <Container>
      <Header />
      <Typography variant="h3" color="primary" align="center" gutterBottom>
        {t('user_requests_title')}
      </Typography>

      <Box sx={{ mt: 4 }}>
        {requestsToShow.map((request) => (
          <UserRequestsCard key={request.id} companyName={request.company.name} status={request.status}
                            handleCancel={() => handleCancel(request.id)} />))}
      </Box>
      <Pagination
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}
        count={pageCount}
        page={page}
        onChange={(event, value) => setPage(value)}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Container>
  );
}

export default withTranslation()(UserRequests);