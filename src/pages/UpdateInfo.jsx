import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { getToken } from '../utils/Storage.js';
import { Requests } from '../api/requests.js';
import axios from '../api/axios.js';
import Header from '../components/Header.jsx';
import { selectUserId, selectUserState } from '../stores/selectors.js';
import { fetchUserById } from '../features/thunks/usersThunks.js';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(0),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const UpdateContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

function UpdateInfo({ t }) {
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const { currentUser } = useSelector(selectUserState);
  const [user, setUser] = React.useState({
    first_name: currentUser?.first_name || '',
    last_name: currentUser?.last_name || '',
    username: currentUser?.username || '',
    description: currentUser?.description || '',
    country: currentUser?.country || '',
    image_path: currentUser?.image_path || '',
  });

  const [error, setError] = React.useState('');
  const dispatch = useDispatch();
  const requests = new Requests(axios);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const updatedFields = {};
    Object.keys(user).forEach((key) => {
      if (user[key] !== currentUser[key]) {
        updatedFields[key] = user[key];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      setError(t('update_info_no_fields_error'));
      return;
    }

    try {
      const updateResponse = await requests.patchUserInfo(userId, updatedFields);
      if (updateResponse.status !== 200) {
        setError(t('update_info_error'));
        return;
      }
      dispatch(fetchUserById({ userId }));
      navigate('/profile');
    } catch (e) {
      setError(t('update_info_unknown_error'));
    }
  };

  return (
    <Box>
      <CssBaseline enableColorScheme />
      <Header />
      <UpdateContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h5"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            {t('update_info_header')}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="first_name">{t('update_info_first_name')}</FormLabel>
              <TextField
                size={'small'}
                fullWidth
                id="first_name"
                name="first_name"
                value={user.first_name}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="last_name">{t('update_info_last_name')}</FormLabel>
              <TextField
                size={'small'}
                fullWidth
                id="last_name"
                name="last_name"
                value={user.last_name}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="username">{t('update_info_username')}</FormLabel>
              <TextField
                size={'small'}
                fullWidth
                required
                id="username"
                name="username"
                value={user.username}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="description">{t('update_info_description')}</FormLabel>
              <TextField
                size={'small'}
                fullWidth
                id="description"
                name="description"
                value={user.description}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="country">{t('update_info_country')}</FormLabel>
              <TextField
                size={'small'}
                fullWidth
                id="country"
                name="country"
                value={user.country}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="image_path">{t('update_info_image_path')}</FormLabel>
              <TextField
                size={'small'}
                fullWidth
                id="image_path"
                name="image_path"
                value={user.image_path}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>

            <Button type="submit" fullWidth variant="contained">
              {t('update_info_button')}
            </Button>
          </Box>

          {error !== '' && (
            <>
              <Typography color="error" mt={1}>
                {error}
              </Typography>
            </>
          )}
        </Card>
      </UpdateContainer>
    </Box>
  );
}

export default withTranslation()(UpdateInfo);
