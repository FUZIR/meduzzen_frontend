import axios from '../../api/axios.js';
import { Requests } from '../../api/requests.js';
import { createAsyncThunk } from '@reduxjs/toolkit';

const requests = new Requests(axios);

export const fetchCompanyQuizzes = createAsyncThunk(
  'quizzes/fetchCompanyQuizzes',
  async ({ company_id, limit, offset }) => {
    const response = await requests.getCompanyQuizzes(company_id, offset, limit);
    return response.data;
  },
);

export const fetchQuizById = createAsyncThunk(
  'quizzes/fetchQuizById',
  async ({ quiz_id }) => {
    const response = await requests.getQuizById(quiz_id);
    return response.data;
  },
);