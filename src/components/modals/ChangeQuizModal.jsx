import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useTranslation } from 'react-i18next';

function UpdateQuizModal({ isOpen, onClose, onSubmit, quiz }) {
  const { t } = useTranslation();

  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [frequency, setFrequency] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (quiz) {
      setQuizTitle(quiz.title);
      setQuizDescription(quiz.description);
      setFrequency(quiz.frequency || 0);
      setQuestions(quiz.questions || []);
    }
  }, [quiz]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { text: '', answers: [{ text: '', is_correct: true }, { text: '', is_correct: false }] },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleAddAnswer = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.push({ text: '', is_correct: false });
    setQuestions(updatedQuestions);
  };

  const handleRemoveAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleChangeQuestion = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      text: value,
    };

    setQuestions(updatedQuestions);
  };

  const handleChangeAnswer = (questionIndex, answerIndex, value) => {
    const updatedQuestions = [...questions];
    const updatedAnswers = [...updatedQuestions[questionIndex].answers];

    updatedAnswers[answerIndex] = {
      ...updatedAnswers[answerIndex],
      text: value,
    };

    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      answers: updatedAnswers,
    };

    setQuestions(updatedQuestions);
  };

  const handleSetCorrectAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers = updatedQuestions[questionIndex].answers.map(
      (answer, index) => ({ ...answer, is_correct: index === answerIndex }),
    );
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    if (!quizTitle.trim()) {
      alert(t('quiz_title_empty'));
      return;
    }

    if (!quizDescription.trim()) {
      alert(t('quiz_description_empty'));
      return;
    }

    if (questions.length === 0) {
      alert(t('at_least_two_questions'));
      return;
    }

    const hasEmptyAnswers = questions.some(
      (question) =>
        !question.text.trim() ||
        question.answers.some((answer) => !answer.text.trim()),
    );

    if (hasEmptyAnswers) {
      alert(t('questions_and_answers_empty'));
      return;
    }

    onSubmit({
      id: quiz.id,
      title: quizTitle,
      description: quizDescription,
      frequency: frequency,
      questions,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{t('update_quiz')}</DialogTitle>
      <DialogContent>
        <TextField
          label={t('quiz_title')}
          fullWidth
          required
          margin="normal"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
        <TextField
          label={t('quiz_description')}
          fullWidth
          required
          margin="normal"
          value={quizDescription}
          onChange={(e) => setQuizDescription(e.target.value)}
        />
        <TextField
          label={t('quiz_frequency')}
          fullWidth
          required
          margin="normal"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />
        {questions.map((question, qIndex) => (
          <Grid container spacing={2} key={qIndex}>
            <Grid item xs={12}>
              <TextField
                label={`${t('question')} ${qIndex + 1}`}
                fullWidth
                value={question.text}
                onChange={(e) => handleChangeQuestion(qIndex, e.target.value)}
              />
            </Grid>
            {question.answers.map((answer, aIndex) => (
              <Grid container spacing={2} key={aIndex} alignItems="center">
                <Grid item xs={8} mt={1} ml={2}>
                  <TextField
                    label={`${t('answer')} ${aIndex + 1}`}
                    fullWidth
                    value={answer.text}
                    onChange={(e) => handleChangeAnswer(qIndex, aIndex, e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={answer.is_correct}
                        onChange={() => handleSetCorrectAnswer(qIndex, aIndex)}
                      />
                    }
                    label={t('correct')}
                  />
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item>
                  <IconButton color="primary" onClick={() => handleAddAnswer(qIndex)}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Grid>
                {question.answers.length > 2 && (
                  <Grid item>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveAnswer(qIndex, question.answers.length - 1)}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Grid>
                )}
                {questions.length > 2 && (
                  <Grid item>
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => handleRemoveQuestion(qIndex)}
                    >
                      {t('remove_question')}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Button color="primary" variant="outlined" onClick={handleAddQuestion}>
          {t('add_question')}
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          {t('cancel')}
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {t('update')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateQuizModal;
