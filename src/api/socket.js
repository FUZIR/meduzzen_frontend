import { getToken } from '../utils/Storage.js';

const URL = import.meta.env.VITE_WS_URL + getToken();
export const socket = new WebSocket(URL);