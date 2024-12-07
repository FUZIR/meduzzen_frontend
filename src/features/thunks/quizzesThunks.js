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

export const fetchQuizById = createAsyncThunk(
  'quizzes/fetchQuizById',
  async ({ quiz_id }) => {
    const response = await requests.getQuizById(quiz_id);
    console.log(response.data);
    return response.data;
  },
);