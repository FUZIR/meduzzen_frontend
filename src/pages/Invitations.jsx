import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Pagination, PaginationItem, Typography } from '@mui/material';
import Header from '../components/Header.jsx';
import { useTranslation, withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectInvitationsState } from '../stores/selectors.js';
import { fetchUserInvitations } from '../features/thunks/invitationsThunks.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import UserInvitationCard from '../components/UserInvitationsCard.jsx';
import axios from '../api/Axios.js';
import { Requests } from '../api/Requests.js';
import { resetInvitationState } from '../features/invitation/invitationSlice.js';

function Invitations() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const requests = new Requests(axios);
  const { entities: userInvitations, loading } = useSelector(selectInvitationsState);
  const invitationsPerPage = 6;
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * invitationsPerPage;
  const endIndex = startIndex + invitationsPerPage;
  const invitationsToShow = userInvitations.slice(startIndex, endIndex);
  const pageCount = Math.ceil(userInvitations.length / invitationsPerPage);

  useEffect(() => {
    dispatch(fetchUserInvitations());

    return () => dispatch(resetInvitationState());
  }, [dispatch]);

  const handleAccept = async (id) => {
    await requests.invitationAccept({ id });
    dispatch(fetchUserInvitations());
  };

  const handleReject = async (id) => {
    await requests.invitationReject({ id });
    dispatch(fetchUserInvitations());
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

  if (!userInvitations || userInvitations.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Header />
        <Typography variant="h6" color="textSecondary">{t('invitations_error')}</Typography>
      </Box>
    );
  }
  return (
    <Container>
      <Header />
      <Typography variant="h3" color="primary" align="center" gutterBottom>
        {t('invitations_title')}
      </Typography>

      <Box sx={{ mt: 4 }}>
        {invitationsToShow.map((invitation) => (
          <UserInvitationCard key={invitation.id} companyName={invitation.company.name}
                              status={invitation.status}
                              onAccept={() => handleAccept(invitation.id)}
                              onReject={() => handleReject(invitation.id)}
          />))}
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

export default withTranslation()(Invitations);