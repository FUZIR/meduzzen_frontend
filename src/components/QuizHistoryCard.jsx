import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useTranslation, withTranslation } from 'react-i18next';

function QuizHistoryCard({ quizData }) {
  const { t } = useTranslation();
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {quizData.map((quiz) => (
          <Grid item xs={12} key={quiz.id}>
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
                width: '100%',
                backgroundColor: 'rgba(255,255,255,0.42)',
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">
                  {quiz.quiz_title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {t('user_last_test_score')}: {quiz.score}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('user_last_test_time')}: {new Date(quiz.last_test_time).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default withTranslation()(QuizHistoryCard);