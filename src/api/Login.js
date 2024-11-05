import axios from './Axios.js';

export default function postLogin(data) {
  return axios.post('/auth/token/login/', data);
}

