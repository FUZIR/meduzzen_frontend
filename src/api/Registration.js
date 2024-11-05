import axios from './Axios.js';

export default function postRegistration(data) {
  return axios.post('/auth/users/', data);
}