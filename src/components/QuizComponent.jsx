import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import axios from '../api/axios.js';
import { Requests } from '../api/requests.js';
import { useNavigate } from 'react-router-dom';

function QuizComponent({ title, description, questions, quizId, companyId }) {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const requests = new Requests(axios);
  const navigate = useNavigate();

  const handleChooseAnswer = (questionId, isCorrect) => {
    if (answeredQuestions[questionId]) return;

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    setAnsweredQuestions((prev) => ({
      ...prev,
      [questionId]: true,
    }));
  };

  const handleEndQuiz = async (quizId) => {
    const response = await requests.endQuiz({ quiz: quizId, company: companyId, correct_answers: correctAnswers });
    if (response.status === 200) {
      navigate(`/companies/${companyId}`);
    }
  };
  return (
    <Box>
      <Typography variant="h5" color="textPrimary" mt={1}>
        Title: {title}
      </Typography>
      <Typography variant="h5" color="textPrimary" mt={1}>
        Description: {description}
      </Typography>
      <Box mt={2}>
        {questions.map((question) => (
          <Card key={question.id} variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom align="center">
                {question.text}
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {question.answers.map((answer) => (
                  <Grid item xs={12} sm={6} md={4} key={answer.id}>
                    <Button
                      variant="outlined"
                      fullWidth
                      color="primary"
                      onClick={() => handleChooseAnswer(question.id, answer.is_correct)}
                      disabled={answeredQuestions[question.id]}
                    >
                      {answer.text}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="contained"
          color="error"
          onClick={() => handleEndQuiz(quizId)}
          disabled={questions.length !== Object.keys(answeredQuestions).length}
        >
          End Test
        </Button>
      </Box>
    </Box>
  );
}

export default QuizComponent;
