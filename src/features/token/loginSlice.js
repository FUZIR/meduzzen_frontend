import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login_token',
  initialState: {
    token: '',
    expirationDate: null,
  },
  reducers: {
    updateToken: (state, action) => {
      const token = action.payload;
      state.token = 'Token '.concat(token);
      state.expirationDate = action.expirationDate;
    },
    deleteToken: (state) => {
      state.token = '';
      state.expirationDate = null;
    },
  },
});

export const { updateToken, deleteToken } = loginSlice.actions;
export default loginSlice.reducer;