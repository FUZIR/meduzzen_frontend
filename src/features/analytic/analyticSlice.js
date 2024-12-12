import { createSlice } from '@reduxjs/toolkit';
import { fetchUserAverageById, fetchUserQuizHistory, fetchUsersAverage } from '../thunks/analyticsThunks.js';

const initialState = {
  usersAverage: [],
  currentUserAverageScores: [],
  currentUserQuizzesHistory: [],
  loading: 'idle',
  error: null,
};

const analyticSlice = createSlice({
  name: 'analytic',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    resetLoading: (state) => {
      state.loading = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAverageById.fulfilled, (state, action) => {
        state.currentUserAverageScores = action.payload;
        state.loading = 'success';
      })
      .addCase(fetchUserAverageById.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchUserAverageById.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'An unknown error';
      })
      .addCase(fetchUsersAverage.fulfilled, (state, action) => {
        state.usersAverage = action.payload;
        state.loading = 'success';
      })
      .addCase(fetchUsersAverage.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchUsersAverage.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'An unknown error';
      })
      .addCase(fetchUserQuizHistory.fulfilled, (state, action) => {
        state.currentUserQuizzesHistory = action.payload;
        state.loading = 'success';
      })
      .addCase(fetchUserQuizHistory.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchUserQuizHistory.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'An unknown error';
      });
  },
});

export const { resetError, resetLoading } = analyticSlice.actions;
export default analyticSlice.reducer;