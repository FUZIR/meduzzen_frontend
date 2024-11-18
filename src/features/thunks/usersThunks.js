import { Requests } from '../../api/Requests.js';
import axios from '../../api/Axios.js';
import { createAsyncThunk } from '@reduxjs/toolkit';

const requests = new Requests(axios);
export const fetchUsers = createAsyncThunk(
  'users/fetchUsersStatus',
  async () => {
    const response = await requests.getUsers();
    return response.data;
  },
);
export const fetchUserById = createAsyncThunk(
  'users/fetchUserByIdStatus',
  async ({ userId }) => {
    const response = await requests.getUserById(userId);
    return response.data;
  },
);