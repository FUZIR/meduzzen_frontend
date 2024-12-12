import React, { useEffect, useState } from 'react';
import { Box, Container, MenuItem, Select, Typography } from '@mui/material';
import Header from '../components/Header.jsx';
import { useTranslation, withTranslation } from 'react-i18next';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title } from 'chart.js';
import UsersAverageChart from '../components/UsersAverageChart.jsx';
import UserAveragesByIdChart from '../components/UserAveragesByIdChart.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCompanyById } from '../features/thunks/companiesThunks.js';
import { selectCompaniesState } from '../stores/selectors.js';
import { fetchUserAverageById } from '../features/thunks/analyticsThunks.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Title);

function CompanyAnalytics() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const companyId = parseInt(id, 10);
  const { currentCompany: company } = useSelector(selectCompaniesState);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    if (companyId) {
      dispatch(fetchCompanyById({ companyId }));
    }
  }, [dispatch, companyId]);

  useEffect(() => {
    if (selectedUserId) {
      dispatch(fetchUserAverageById(selectedUserId));
    }
  }, [dispatch, selectedUserId]);

  const handleUserChange = (event) => {
    setSelectedUserId(event.target.value);
  };
  return (
    <Box>
      <Header />
      <Container maxWidth="md">
        <Typography variant="h3" color="primary" align="center" gutterBottom>
          {t('analytics_header')}
        </Typography>
        <Box align="center">
          <UsersAverageChart />
          <UserAveragesByIdChart user_id={selectedUserId} />
          <Box align={'left'} sx={{ ml: 4 }}>
            {company?.members?.length > 0 && (
              <Select
                displayEmpty
                value={selectedUserId || ''}
                onChange={handleUserChange}
                sx={{ mt: 2, width: '10vw' }}
              >
                {company?.members?.length > 0 && (
                  company.members.map((member) => (
                    <MenuItem key={member.id} value={member.id}>
                      {member.username}
                    </MenuItem>
                  ))
                )}
              </Select>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default withTranslation()(CompanyAnalytics);
