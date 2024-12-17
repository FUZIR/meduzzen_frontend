import React from 'react';
import QuizComponent from '../components/QuizComponent.jsx';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Quiz component', () => {
  const questions = [
    {
      id: 1,
      text: 'first question',
      answers: [{ id: 1, text: 'first', is_correct: true }, { id: 2, text: 'second', is_correct: false }],
    },
    {
      id: 2,
      text: 'second question',
      answers: [{ id: 3, text: 'third', is_correct: true }, { id: 4, text: 'fourth', is_correct: false }],
    },
  ];
  test('Quiz component render test', () => {
    render(
      <MemoryRouter>
        <QuizComponent title="title" description="description" questions={questions} quizId={1} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Title: title')).toBeInTheDocument();
    expect(screen.getByText('Description: description')).toBeInTheDocument();
    expect(screen.getByText('first question')).toBeInTheDocument();
    expect(screen.getByText('second question')).toBeInTheDocument();
    expect(screen.getByText('first')).toBeInTheDocument();
    expect(screen.getByText('second')).toBeInTheDocument();
    expect(screen.getByText('third')).toBeInTheDocument();
    expect(screen.getByText('fourth')).toBeInTheDocument();

    const endTestButton = screen.getByRole('button', { name: 'End Test' });
    expect(endTestButton).toBeInTheDocument();
    expect(endTestButton).toBeDisabled();
  });
  test('One answer chosen', () => {
    render(
      <MemoryRouter>
        <QuizComponent title="title" description="description" questions={questions} quizId={1} />
      </MemoryRouter>,
    );
    const answer1 = screen.getByRole('button', { name: 'first' });
    const endTestButton = screen.getByRole('button', { name: 'End Test' });
    expect(endTestButton).toBeInTheDocument();
    expect(endTestButton).toBeDisabled();
    fireEvent.click(answer1);
    expect(answer1).toBeDisabled();
    expect(endTestButton).toBeDisabled();
  });
  test('All answer chosen', () => {
    render(
      <MemoryRouter>
        <QuizComponent title="title" description="description" questions={questions} quizId={1} />
      </MemoryRouter>,
    );
    const answer1 = screen.getByRole('button', { name: 'first' });
    const answer2 = screen.getByRole('button', { name: 'third' });
    const endTestButton = screen.getByRole('button', { name: 'End Test' });
    expect(endTestButton).toBeInTheDocument();
    expect(endTestButton).toBeDisabled();
    fireEvent.click(answer1);
    fireEvent.click(answer2);
    expect(endTestButton).toBeEnabled();
  });
  test('Click on disabled answer', () => {
    render(
      <MemoryRouter>
        <QuizComponent title="title" description="description" questions={questions} quizId={1} />
      </MemoryRouter>,
    );
    const answer1 = screen.getByRole('button', { name: 'first' });
    const answer2 = screen.getByRole('button', { name: 'second' });
    const answer3 = screen.getByRole('button', { name: 'third' });
    const answer4 = screen.getByRole('button', { name: 'fourth' });
    fireEvent.click(answer1);
    expect(answer2).toBeDisabled();
    fireEvent.click(answer4);
    expect(answer3).toBeDisabled();
  });
});