import { Box, Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { withTranslation } from 'react-i18next';
import LangSelect from '../components/LangSelect.jsx';

function Welcome({ t }) {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: '100vh',
      position: 'relative',
    }}>
      <Typography variant={'h2'} color={'primary'} gutterBottom>
        {t('welcome_page_header')}
      </Typography>
      <Typography variant={'h3'} color={'primary'} marginBottom={'30px'} gutterBottom>
        {t('welcome_page_subheader')}
      </Typography>
      <Button variant={'contained'} endIcon={<SendIcon />} href={'/about'} size={'large'}> Let's goooo!</Button>
      <LangSelect />
    </Box>
  );
}

export default withTranslation()(Welcome);