import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompaniesState, selectUserId, selectUserState } from '../../stores/selectors.js';
import { withTranslation } from 'react-i18next';
import { fetchUserById } from '../../features/thunks/usersThunks.js';
import { fetchCompanies } from '../../features/thunks/companiesThunks.js';
import axios from '../../api/axios.js';
import { Requests } from '../../api/requests.js';

function UserInfo({ t }) {
  const { id } = useParams();
  const userId = parseInt(id);
  const requests = new Requests(axios);
  const dispatch = useDispatch();
  const { currentUser: user, loading: loading } = useSelector(selectUserState);
  const { entities: allCompanies } = useSelector(selectCompaniesState);
  const currentUserId = useSelector(selectUserId);
  const companies = allCompanies.filter((company) => company.owner === currentUserId);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [isInviteSend, setIsInviteSend] = useState(false);
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserById({ userId }));
    }
    dispatch(fetchCompanies());
  }, [userId, user, dispatch]);

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
  if (!user) {
    return <Typography variant="h6" color={'error'} align={'center'}>User not found</Typography>;
  }

  const handleInvite = async () => {
    await requests.createInvitation({ user: userId, company: selectedCompany });
    setIsInviteSend(true);
  };
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
        <Card sx={{ width: '40vw', maxWidth: 500 }}>
          <CardMedia
            component="img"
            height="300"
            image={user.image_path ? user.image_path : 'https://m0.a-shop.com/pub/media/catalog/product/cache/919f1b96b31b31e0fef65e4769f00b6a/9/f/9fc0f561-f5f5-48e2-b954-deff7d93dc5f.jpg'}
            alt={`${user.username}`}
          />
          <CardContent>

            {user.first_name && user.last_name ?
              <Typography variant="h5" component="div" gutterBottom>{user.first_name} {user.last_name}</Typography> :
              <Typography variant="h5" component="div" gutterBottom>{user.username}</Typography>
            }

            {user.company ?
              <Typography variant="body1" color="text.secondary">
                {t('account_menu_companies')}: {user.company.name}
              </Typography> :
              <Typography variant="body1" color="text.secondary">
                {t('account_menu_companies')}: unemployed
              </Typography>
            }
            <Typography variant="body1" color="text.secondary">
              {t('login_email')}: {user.email}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="company-selector-label">{t('select_company')}</InputLabel>
                <Select
                  labelId="company-selector-label"
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  label={t('select_company')}
                >
                  {companies.length > 0 ? (
                    companies.map((company) => (
                      <MenuItem key={company.id} value={company.id}>
                        {company.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>{t('no_companies_available')}</MenuItem>
                  )}
                </Select>
              </FormControl>
              {!isInviteSend ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleInvite}
                  disabled={!selectedCompany}
                  sx={{ mt: 2 }}
                >
                  {t('invite_user_button')}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleInvite}
                  disabled
                  sx={{ mt: 2 }}
                >
                  {t('invite_user_button_sent')}
                </Button>
              )}

            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default withTranslation()(UserInfo);