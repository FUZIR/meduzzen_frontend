import quizReducer from '../features/quiz/quizSlice.js';
import { fetchCompanyQuizzes, fetchQuizById } from '../features/thunks/quizzesThunks.js';

describe('Quiz reducer', () => {
  const initialState = {
    entities: [],
    next: null,
    prev: null,
    count: 0,
    loading: 'idle',
    error: null,
    currentQuiz: null,
  };
  it('return initial state', () => {
    expect(quizReducer(undefined, {})).toEqual(
      {
        entities: [],
        next: null,
        prev: null,
        count: 0,
        loading: 'idle',
        error: null,
        currentQuiz: null,
      },
    );
  });

  it('return fetched company quizzes success', () => {
    const action = {
      type: fetchCompanyQuizzes.fulfilled.type,
      payload: [
        {
          results: [{ id: 1, title: 'Quiz 1' }, { id: 2, title: 'Quiz 2' }],
          next: null,
          previous: null,
          count: 2,
        },
      ],
    };
    const updatedState = quizReducer(initialState, action);
    expect(updatedState.entities).toEqual(action.payload.results);
    expect(updatedState.prev).toEqual(action.payload.prev);
    expect(updatedState.next).toEqual(action.payload.next);
    expect(updatedState.count).toEqual(action.payload.count);
  });
  it('fetched company quizzes pending', () => {
    const action = {
      type: fetchCompanyQuizzes.pending.type,
      payload: [],
    };
    const updatedState = quizReducer(initialState, action);
    expect(updatedState.loading).toEqual('pending');
    expect(updatedState.error).toEqual(null);
  });

  it('fetched company quizzes rejected', () => {
    const action = {
      type: fetchCompanyQuizzes.rejected.type,
      payload: {
        error: 'Error fetching data.',
      },
    };
    const updatedState = quizReducer(initialState, action);
    expect(updatedState.loading).toEqual('rejected');
    expect(updatedState.error).toEqual(action.error?.message || 'An unknown error');
  });
  it('return fetched quiz success', () => {
    const action = {
      type: fetchQuizById.fulfilled.type,
      payload: [
        {
          id: 1,
          title: 'Quiz 1',
          description: 'Quiz description',
        },
      ],
    };
    const updatedState = quizReducer(initialState, action);
    expect(updatedState.currentQuiz).toEqual(action.payload);
  });
  it('fetched quiz pending', () => {
    const action = {
      type: fetchQuizById.pending.type,
      payload: [],
    };
    const updatedState = quizReducer(initialState, action);
    expect(updatedState.loading).toEqual('pending');
    expect(updatedState.error).toEqual(null);
  });

  it('fetched quiz rejected', () => {
    const action = {
      type: fetchQuizById.rejected.type,
      payload: {
        error: 'Error fetching data.',
      },
    };
    const updatedState = quizReducer(initialState, action);
    expect(updatedState.loading).toEqual('rejected');
    expect(updatedState.error).toEqual(action.error?.message || 'An unknown error');
  });
});