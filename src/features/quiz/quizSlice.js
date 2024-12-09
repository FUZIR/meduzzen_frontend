import { createSlice } from '@reduxjs/toolkit';
import { fetchCompanyQuizzes, fetchQuizById } from '../thunks/quizzesThunks.js';

const initialState = {
  entities: [],
  next: null,
  prev: null,
  count: 0,
  loading: 'idle',
  error: null,
  currentQuiz: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    resetLoading: (state) => {
      state.loading = 'idle';
    },
    resetQuizzes: (state) => {
      state.entities = [];
      state.next = null;
      state.prev = null;
      state.count = 0;
      state.loading = 'idle';
      state.error = null;
      state.currentQuiz = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyQuizzes.fulfilled, (state, action) => {
        const { results, next, previous, count } = action.payload;
        state.entities = results;
        state.next = next;
        state.prev = previous;
        state.count = count;
        state.loading = 'success';
      })
      .addCase(fetchCompanyQuizzes.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchCompanyQuizzes.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'An unknown error';
      })
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        state.currentQuiz = action.payload;
        state.loading = 'success';
      })
      .addCase(fetchQuizById.pending, (state) => {
        state.currentQuiz = null;
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchQuizById.rejected, (state, action) => {
        state.currentQuiz = null;
        state.loading = 'rejected';
        state.error = action.error?.message || 'An unknown error';
      });
  },
});

export const { resetError, resetLoading, resetQuizzes } = quizSlice.actions;
export default quizSlice.reducer;