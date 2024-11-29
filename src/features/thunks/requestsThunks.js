import axios from '../../api/Axios.js';
import { Requests } from '../../api/Requests.js';
import { createAsyncThunk } from '@reduxjs/toolkit';

const requests = new Requests(axios);

export const fetchCompanyRequests = createAsyncThunk(
  'requests/fetchCompanyRequests',
  async ({ companyId }) => {
    const response = await requests.getCompanyRequests(companyId);
    return response.data;
  },
);

export const fetchUserRequests = createAsyncThunk(
  'requests/fetchUserRequests',
  async () => {
    const response = await requests.getUserRequests();
    return response.data;
  },
);