import { createSlice } from '@reduxjs/toolkit';
import { fetchCompanyInvitations, fetchUserInvitations } from '../thunks/invitationsThunks.js';

const initialState = {
  entities: [],
  loading: 'idle',
  error: null,
};

const invitationSlice = createSlice({
  name: 'invitation',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    resetLoading: (state) => {
      state.loading = 'idle';
    },
    resetInvitationState: (state) => {
      state.entities = [];
      state.loading = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInvitations.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = 'success';
      })
      .addCase(fetchUserInvitations.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchUserInvitations.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'An error occured';
      })
      .addCase(fetchCompanyInvitations.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = 'success';
      })
      .addCase(fetchCompanyInvitations.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchCompanyInvitations.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'An error occured';
      });
  },
});

export const { resetError, resetLoading, resetInvitationState } = invitationSlice.actions;
export default invitationSlice.reducer;