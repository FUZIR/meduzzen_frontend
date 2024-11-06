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
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateToken } from '../features/token/loginSlice.js';
import { withTranslation } from 'react-i18next';
import { URLS } from '../utils/Urls.js';
import { storeToken } from '../utils/Storage.js';
import CalculateExpirationDate from '../utils/CalculateExpirationDate.js';

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


const SignUpContainer = styled(Stack)(({ theme }) => ({
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


function Login({ t }) {
  const navigate = useNavigate();

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const dispatch = useDispatch();

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

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

    return isValid;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!validateInputs()) return;
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);

    try {
      const loginResponse = await postLogin({
        email: data.get('email'),
        password: data.get('password'),
      });
      if (loginResponse.status !== 200) {
        setError('Login error');
        return;
      }
      const expiration = CalculateExpirationDate();
      dispatch(updateToken(loginResponse.data.auth_token, expiration));
      storeToken(loginResponse.data.auth_token, expiration);
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
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            {t('login_header')}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="email">{t('login_email')}</FormLabel>
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
              <FormLabel htmlFor="password">{t('login_password')}</FormLabel>
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
              {t('login_button')}
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              {t('login_question')} {' '}
              <span>
                <Link
                  href={URLS.REGISTER}
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  {t('registration_button')}
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
      </SignUpContainer>
    </Box>);
}

export default withTranslation()(Login);