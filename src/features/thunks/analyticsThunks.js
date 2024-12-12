import { Requests } from '../../api/requests.js';
import axios from '../../api/axios.js';
import { createAsyncThunk } from '@reduxjs/toolkit';

const requests = new Requests(axios);

export const fetchUserAverageById = createAsyncThunk(
  'analytics/fetchUserAverageById',
  async (user_id) => {
    const response = await requests.getUserAverageAnalyticById(user_id);
    return response.data;
  },
);

export const fetchUsersAverage = createAsyncThunk(
  'analytics/fetchUsersAverage',
  async () => {
    const response = await requests.getUsersAverageAnalytics();
    return response.data;
  },
);

export const fetchUserQuizHistory = createAsyncThunk(
  'analytics/fetchUserQuizHistory',
  async () => {
    const response = await requests.getUserQuizzesHistory();
    return response.data;
  },
);