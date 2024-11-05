import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import postRegistration from '../api/Registration.js';
import postLogin from '../api/Login.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateToken } from '../features/token/loginSlice.js';
import { withTranslation } from 'react-i18next';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
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


const LoginContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
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


const tokenExpiryDuration = 3600;
const expirationDate = new Date().getTime() + tokenExpiryDuration * 1000;

function Registration({ t }) {
  const navigate = useNavigate();

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const dispatch = useDispatch();

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const username = document.getElementById('username');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!username.value || username.value.length < 1) {
      setUsernameError(true);
      setUsernameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    return isValid;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!validateInputs()) return;
    if (usernameError || emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    const userData = {
      username: data.get('username'),
      first_name: data.get('first_name'),
      last_name: data.get('last_name'),
      email: data.get('email'),
      password: data.get('password'),
      image_path: '',
    };

    try {
      const registerResponse = await postRegistration(userData);
      if (registerResponse.status === 409) {
        setError('User already exists');
        return;
      } else if (registerResponse.status !== 201) {
        setError(registerResponse.data);
        return;
      }

      const loginResponse = await postLogin({
        email: userData.email,
        password: userData.password,
      });
      if (loginResponse.status !== 200) {
        setError('Login error');
        return;
      }
      dispatch(updateToken(loginResponse.data.auth_token));
      localStorage.setItem('auth_token', loginResponse.data.auth_token);
      localStorage.setItem('token_expiry', expirationDate);
      navigate('/info');
    } catch (e) {
      let errorMessage = 'An unknown error occurred';

      if (e.response) {
        const responseData = e.response.data;
        if (responseData.username) {
          errorMessage = responseData.username.join(', ');
        } else if (responseData.email) {
          errorMessage = responseData.email.join(', ');
        } else if (responseData.detail) {
          errorMessage = responseData.detail;
        } else {
          errorMessage = e.message;
        }
      }
      setError(String(errorMessage));
    }
  };

  return (
    <Box>
      <CssBaseline enableColorScheme />
      <LoginContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            {t('registration_header')}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="email">{t('registration_email')}</FormLabel>
              <TextField
                size={'small'}
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="username">{t('registration_username')}</FormLabel>
              <TextField
                size={'small'}
                required
                fullWidth
                id="username"
                placeholder="nickname"
                name="username"
                autoComplete="username"
                variant="outlined"
                error={usernameError}
                helperText={usernameErrorMessage}
                color={usernameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="first_name">{t('registration_firstname')}</FormLabel>
              <TextField
                size={'small'}
                autoComplete="first_name"
                name="first_name"
                fullWidth
                id="first_name"
                placeholder="John"
                color={'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="last_name">{t('registration_lastname')}</FormLabel>
              <TextField
                size={'small'}
                autoComplete="last_name"
                name="last_name"
                fullWidth
                id="last_name"
                placeholder="Snow"
                color={'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">{t('registration_password')}</FormLabel>
              <TextField
                size={'small'}
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              {t('registration_button')}
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              {t('registration_question')}{' '}
              <span>
                <Link
                  href="/login"
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  {t('login_button')}
                </Link>
              </span>
            </Typography>
          </Box>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {typeof error === 'string' ? error : 'An error occurred'}
            </Typography>
          )}
        </Card>
      </LoginContainer>
    </Box>);
}

export default withTranslation()(Registration);