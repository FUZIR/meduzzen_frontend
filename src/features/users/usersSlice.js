import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Requests } from '../../api/Requests.js';
import axios from '../../api/Axios.js';

const requests = new Requests(axios);
export const fetchUsers = createAsyncThunk(
  'users/fetchUsersStatus',
  async (token) => {
    const response = await requests.getUsers(token);
    return response.data;
  },
);
export const fetchUserById = createAsyncThunk(
  'users/fetchUserByIdStatus',
  async ({ userId, token }) => {
    const response = await requests.getUserById(userId, token);
    return response.data;
  },
);

const initialState = {
  entities: [],
  loading: 'idle',
  error: null,
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