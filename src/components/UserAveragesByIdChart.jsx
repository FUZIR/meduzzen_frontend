import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Requests } from '../api/requests.js';
import axios from '../api/axios.js';

function UserAveragesByIdChart({ user_id }) {
  const requests = new Requests(axios);
  const { t } = useTranslation();
  const [userAverage, setUserAverage] = useState([]);

  useEffect(() => {
    if (user_id) {
      requests.getUserAverageAnalyticById(user_id).then((response) => {
        setUserAverage(response.data);
      });
    }
  }, [user_id]);

  const chartData = {
    labels: userAverage?.map((data) => data.date),
    datasets: [
      {
        label: 'User average score',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: userAverage.map((data) => data.average_score),
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
