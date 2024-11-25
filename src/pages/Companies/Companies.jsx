import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Pagination, PaginationItem, Typography } from '@mui/material';
import InfoCard from '../../components/InfoCard.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Header from '../../components/Header.jsx';
import { withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies } from '../../features/thunks/companiesThunks.js';
import { selectCompaniesState, selectUserId } from '../../stores/selectors.js';
import { isUserOwner } from '../../utils/isUserOwner.js';

function Companies({ t }) {
  const dispatch = useDispatch();
  const { entities: companies = [], loading } = useSelector(selectCompaniesState);
  const userId = parseInt(useSelector(selectUserId));
  const companiesPerPage = 6;
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * companiesPerPage;
  const endIndex = startIndex + companiesPerPage;
  const companiesToShow = companies.slice(startIndex, endIndex);
  const pageCount = Math.ceil(companies.length / companiesPerPage);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

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

  if (!companies || companies.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Header />
        <Typography variant="h6" color="textSecondary">{t('companies_error')}</Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Header />
      <Container maxWidth="xl">
        <Container maxWidth="md">
          <Typography variant="h3" color="primary" align="center" gutterBottom>
            {t('companies_header')}
          </Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
            {companiesToShow.map((company) => (
              <InfoCard detailsUrl={'/companies'}
                        id={company.id}
                        title={company.name}
                        imageUrl={company.image_path}
                        description={company.description}
                        key={company.name}
                        isUserCompany={isUserOwner(userId, company.owner)}
              />
            ))}
          </Box>
          <Pagination
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 3,
              marginBottom: 3,
            }}
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

export default withTranslation()(Companies);