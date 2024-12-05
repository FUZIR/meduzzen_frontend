import axios from '../../api/Axios.js';
import { Requests } from '../../api/Requests.js';
import { createAsyncThunk } from '@reduxjs/toolkit';

const requests = new Requests(axios);

export const fetchCompanyQuizzes = createAsyncThunk(
  'quizzes/fetchCompanyQuizzes',
  async ({ company_id }) => {
    const response = await requests.getCompanyQuizzes(company_id);
    return response.data;
  },
);