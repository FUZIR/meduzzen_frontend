import { useEffect, useState } from 'react';
import { Box, Container, Pagination, PaginationItem, Typography } from '@mui/material';
import InfoCard from '../../components/InfoCard.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { withTranslation } from 'react-i18next';
import Header from '../../components/Header.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../utils/Storage.js';
import { selectUserState } from '../../stores/selectors.js';
import { fetchUsers } from '../../features/thunks/usersThunks.js';

function Users({ t }) {
  const dispatch = useDispatch();
  const { entities: users = [] } = useSelector(selectUserState);
  const usersPerPage = 6;
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const usersToShow = users.slice(startIndex, endIndex);
  const pageCount = Math.ceil(users.length / usersPerPage);
  useEffect(() => {
    dispatch(fetchUsers(getToken()));
  }, [dispatch]);

  if (!users || users.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Header />
        <Typography variant="h6" color="textSecondary">{t('users_error')}</Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Header />
      <Container maxWidth={'xl'}>
        <Container maxWidth={'md'}>
          <Typography variant="h3" color="primary" align="center" gutterBottom>
            {t('users_header')}
          </Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
            {usersToShow.map((user) => (
              <InfoCard detailsUrl={`/users`}
                        id={parseInt(user.id)}
                        title={user.first_name && user.last_name ? user.first_name : user.username}
                        subtitle={user.first_name && user.last_name ? user.last_name : ''}
                        imageUrl={user.image_path}
                        description={user.company}
                        key={user.id}
              />
            ))}
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
      </Container>
    </Box>
  );
}

export default withTranslation()(Users);