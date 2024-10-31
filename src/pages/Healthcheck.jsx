import { Box, Typography } from '@mui/material';
import getHealthcheck from '../api/Healthcheck.js';
import { useEffect, useState } from 'react';

function Healthcheck() {
  const [data, setData] = useState(null);
  useEffect(() => {
    getHealthcheck().then(
      function(response) {
        setData(response.data);
      },
    ).catch(err => console.log(err));
  }, []);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Typography color={'primary'} variant={'h3'} marginTop={'20px'}>Backend healthcheck</Typography>
      {
        data !== null ?
          <Box sx={{
            display: 'flex',
            alignItems: 'left',
            flexDirection: 'column',
            marginTop: 3,
          }}>
            <Typography color={'success'} variant={'h4'}>Status: {data.status_code}</Typography>
            <Typography color={'success'} variant={'h4'}>Detail: {data.detail}</Typography>
            <Typography color={'success'} variant={'h4'}>Result: {data.result}</Typography>
          </Box> :
          <Box>
            <Typography variant={'h4'} color={'error'} marginTop={5}>
              Server is not active
            </Typography>
          </Box>
      }
    </Box>
  );
}

export default Healthcheck;