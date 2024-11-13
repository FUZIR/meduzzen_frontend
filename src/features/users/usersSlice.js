import { createSlice } from '@reduxjs/toolkit';
import { fetchUserById, fetchUsers } from '../thunks/usersThunks.js';

const initialState = {
  entities: [],
  loading: 'idle',
  error: null,
  currentUser: null,
};
const usersSlice = createSlice({
    name: 'users',
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
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.entities = action.payload.results;
          state.loading = 'succeeded';
        })
        .addCase(fetchUsers.pending, (state) => {
          state.loading = 'pending';
          state.error = null;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.loading = 'rejected';
          state.error = action.error?.message || 'An error occured';
        })
        .addCase(fetchUserById.fulfilled, (state, action) => {
          state.loading = 'succeeded';
          state.currentUser = action.payload;
          if (!Array.isArray(state.entities)) {
            state.entities = [];
          }
          const existingUser = state.entities?.find((user) => user.id === action.payload.id);
          if (!existingUser) {
            state.entities.push(action.payload);
          }
        })
        .addCase(fetchUserById.pending, (state) => {
          state.loading = 'pending';
          state.error = null;
        })
        .addCase(fetchUserById.rejected, (state, action) => {
          state.loading = 'rejected';
          state.error = action.error?.message || 'An error occured';
        });
    },
  },
);

export const { resetError, resetLoading } = usersSlice.actions;
export default usersSlice.reducer;