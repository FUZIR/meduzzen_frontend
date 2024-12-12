import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import { useTranslation, withTranslation } from 'react-i18next';
import { Requests } from '../api/requests.js';
import axios from '../api/axios.js';

function UsersAverageChart() {
  const requests = new Requests(axios);
  const { t } = useTranslation();
  const [usersAverage, setUsersAverage] = useState([]);

  useEffect(() => {
    requests.getUsersAverageAnalytics().then((response) => {
      setUsersAverage(response.data);
    });
  }, []);

  const data = {
    labels: usersAverage.map((timeline) => timeline.date),
    datasets: [
      {
        label: 'Users average score',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: usersAverage.map((timeline) => timeline.average_score),
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'b',
        },
      },
    },
  };
  return (
    <Box>
      <Typography variant="h5" gutterBottom align={'left'}>
        {t('users_average_score_title')}
      </Typography>
      <Line data={data} options={config} />
    </Box>
  );
}

export default withTranslation()(UsersAverageChart);