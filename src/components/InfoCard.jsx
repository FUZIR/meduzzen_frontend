import { Avatar, Box, Button, Typography } from '@mui/material';
import { withTranslation } from 'react-i18next';

function InfoCard({ id, title, subtitle, imageUrl, description, detailsUrl, isUserCompany, t }) {
  return (
    <Box sx={{
      padding: 2,
      border: isUserCompany ? '2px solid #007bff' : '1px solid #ddd',
      borderRadius: 2,
      backgroundColor: '#f9f9f9',
      marginBottom: 2,
      transition: 'transform 0.2s',
      width: '16vw',
      height: '35vh',
      position: 'relative',
      '&:hover': {
        transform: 'scale(1.02)', boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      },
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant={'h6'}>
            {title}
          </Typography>
          <Typography variant={'h6'}>
            {subtitle}
          </Typography>
        </Box>
        <Avatar alt={'avatar'} src={imageUrl}
                sx={{ width: '60px', height: '60px' }}>
        </Avatar>
      </Box>
      <Typography variant={'body'} color={'primary'}>{description}</Typography>
      <Button variant={'text'} href={`${detailsUrl}/${id}`} size={'small'}
              sx={{ position: 'absolute', bottom: '10px', right: '10px' }}
              color={'primary'}>{t('info_cards_button')}
      </Button>
    </Box>
  );
}

export default withTranslation()(InfoCard);
