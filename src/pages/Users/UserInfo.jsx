import React from 'react';
import { Box, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { usersInfo as users } from '../../utils/UserMock.js';
import Header from '../../components/Header.jsx';

function UserInfo() {
  const { id } = useParams();
  const userId = parseInt(id);
  const user = users.find(user => user.id === userId);
  if (!user) {
    return <Typography variant="h6" color={'error'} align={'center'}>User not found</Typography>;
  }
  return (
    <Box>
      <Header />
      <Container maxWidth={'md'} sx={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Card sx={{ maxWidth: 400 }}>
          <CardMedia
            component="img"
            height="300"
            image={user.photoUrl}
            alt={`${user.name} ${user.surname}`}
          />
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {user.name} {user.surname}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Company: {user.company}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Position: {user.position}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Email: {user.email}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default UserInfo;