import { createSlice } from '@reduxjs/toolkit';
import { fetchCompanyRequests, fetchUserRequests } from '../thunks/requestsThunks.js';

const initialState = {
  entities: [],
  loading: 'idle',
  error: null,
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    resetLoading: (state) => {
      state.loading = 'idle';
    },
    resetRequestsState(state) {
      state.entities = [];
      state.loading = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRequests.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = 'success';
      })
      .addCase(fetchUserRequests.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchUserRequests.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'An error occured';
      })
      .addCase(fetchCompanyRequests.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = 'success';
      })
      .addCase(fetchCompanyRequests.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchCompanyRequests.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'An error occured';
      });
  },
});


export const { resetError, resetLoading, resetRequestsState } = requestSlice.actions;
export default requestSlice.reducer;