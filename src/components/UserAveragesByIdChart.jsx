import React, { useEffect } from 'react';
import { fetchUserAverageById } from '../features/thunks/analyticsThunks.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectAnalyticsState } from '../stores/selectors.js';
import { Line } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function UserAveragesByIdChart({ user_id }) {
  const dispatch = useDispatch();
  const { currentUserAverageScores } = useSelector(selectAnalyticsState);
  const { t } = useTranslation();

  useEffect(() => {
    if (user_id) {
      dispatch(fetchUserAverageById(user_id));
    }
  }, [dispatch]);

  const chartData = {
    labels: currentUserAverageScores?.map((data) => data.date),
    datasets: [
      {
        label: 'User average score',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: currentUserAverageScores.map((data) => data.average_score),
      },
    ],
  };

  const config = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom align={'left'}>
        {t('user_average_score_chart_title')}
      </Typography>
      <Box>
        <Line data={chartData} options={config} />
      </Box>
    </Box>
  );
}

export default UserAveragesByIdChart;
