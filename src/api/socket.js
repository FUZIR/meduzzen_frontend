import { getToken } from '../utils/Storage.js';

const URL = import.meta.env.VITE_WS_URL + getToken();
console.log(URL);
export const socket = new WebSocket(URL);