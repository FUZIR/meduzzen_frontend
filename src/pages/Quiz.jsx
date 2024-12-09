import React, { useEffect } from 'react';
import Header from '../components/Header.jsx';
import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import QuizComponent from '../components/QuizComponent.jsx';
import { useSelector } from 'react-redux';
import { selectQuizzesState, selectUserId } from '../stores/selectors.js';
import { hashQuizId } from '../utils/hashing.js';
import { useNavigate, useParams } from 'react-router-dom';

function Quiz() {
  const { t } = useTranslation();
  const userId = useSelector(selectUserId);
  const { currentQuiz: quiz, loading } = useSelector(selectQuizzesState);
  const quizHash = quiz ? hashQuizId(quiz.id, userId) : null;
  const { hash } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (quizHash !== hash) {
      navigate('/');
    }
  }, [quizHash, hash, navigate]);

  if (loading === 'pending' || !quiz) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Header />
      <Container maxWidth="xl">
        <Container maxWidth="md">
          <Typography variant="h3" color="primary" align="center" gutterBottom>
            {t('quiz_page_title')}
          </Typography>
          <QuizComponent title={quiz.title} description={quiz.description} questions={quiz.questions}
                         quizId={quiz.id} companyId={quiz.company} />
        </Container>
      </Container>
    </Box>
  );
}

export default Quiz;
