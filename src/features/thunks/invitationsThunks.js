import { Requests } from '../../api/Requests.js';
import axios from '../../api/Axios.js';
import { createAsyncThunk } from '@reduxjs/toolkit';

const requests = new Requests(axios);

export const fetchCompanyInvitations = createAsyncThunk(
  'invitations/fetchCompanyInvitations',
  async ({ companyId }) => {
    const response = await requests.getCompanyInvitations(companyId);
    return response.data;
  },
);

export const fetchUserInvitations = createAsyncThunk(
  'invitations/fetchUserInvitations',
  async () => {
    const response = await requests.getUserInvitations();
    return response.data;
  },
);

