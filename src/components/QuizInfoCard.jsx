import { Box, Button, Typography } from '@mui/material';
import { withTranslation } from 'react-i18next';

function QuizInfoCard({ title, description, t, isAdmin, isOwner, onQuizDelete, onQuizUpdate }) {
  return (
    <Box
      sx={{
        padding: 2,
        border: '1px solid #ddd',
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
        marginBottom: 2,
        transition: 'transform 0.2s',
        width: '16vw',
        height: '35vh',
        position: 'relative',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        },
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="primary" sx={{ marginBottom: 2 }}>
        {description}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
        }}
      >
        <Button
          variant="contained"
          size="small"
          color="primary"
        >
          {t('start_quiz_button')}
        </Button>

        {(isAdmin || isOwner) && (
          <>
            <Button
              variant="outlined"
              onClick={onQuizUpdate}
              size="small"
              color="secondary"
            >
              {t('edit_quiz_button')}
            </Button>
            <Button
              variant="outlined"
              onClick={onQuizDelete}
              size="small"
              color="error"
            >
              {t('delete_quiz_button')}
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default withTranslation()(QuizInfoCard);
