import axios from '../../api/axios.js';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Requests } from '../../api/requests.js';

const requests = new Requests(axios);

export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompaniesStatus',
  async () => {
    const response = await requests.getCompanies();
    return response.data;
  },
);

export const fetchCompanyById = createAsyncThunk(
  'company/fetchCompanyByIdStatus',
  async ({ companyId }) => {
    const response = await requests.getCompanyById(companyId);
    return response.data;
  },
);