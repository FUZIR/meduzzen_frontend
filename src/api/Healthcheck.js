import axiosClient from './Axios.js';

export default function getHealthcheck() {
  return axiosClient.get('/');
}