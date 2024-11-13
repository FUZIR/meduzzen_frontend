import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login_token',
  initialState: {
    userId: null,
    token: '',
    expirationDate: null,
    isAuthenticated: false,
  },
  reducers: {
    updateToken: (state, action) => {
      const { userId, token, expirationDate } = action.payload;
      state.userId = userId;
      state.token = 'Token '.concat(token);
      state.expirationDate = expirationDate;
      state.isAuthenticated = Boolean(token);
    },
    deleteToken: (state) => {
      state.userId = null;
      state.token = '';
      state.expirationDate = null;
      state.isAuthenticated = false;
    },
  },
});

export const { updateToken, deleteToken } = loginSlice.actions;
export default loginSlice.reducer;