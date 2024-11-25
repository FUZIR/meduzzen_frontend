import { createSlice } from '@reduxjs/toolkit';
import { fetchCompanies, fetchCompanyById } from '../thunks/companiesThunks.js';

const initialState = {
  entities: [],
  loading: 'idle',
  error: null,
  currentCompany: null,
};
const companySlice = createSlice({
  name: 'company',
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
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'An error occured';
      })
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.currentCompany = action.payload;
        if (!Array.isArray(state.entities)) {
          state.entities = [];
        }
        const existingCompany = state.entities?.find((company) => company.id === action.payload.id);
        if (!existingCompany) {
          state.entities.push(action.payload);
        }
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'An error occured';
      })
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      });
  },
});

export const { resetError, resetLoading } = companySlice.actions;
export default companySlice.reducer;