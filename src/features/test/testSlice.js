import { createSlice } from '@reduxjs/toolkit';

const testSlice = createSlice({
  name: 'test',
  initialState: {
    lang: 'en',
  },
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { changeLang } = testSlice.actions;
export default testSlice.reducer;