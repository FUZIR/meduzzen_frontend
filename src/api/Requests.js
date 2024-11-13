import { getToken } from '../utils/Storage.js';

export class Requests {

  constructor(axiosInstance) {
    this.axios = axiosInstance;
    this.token = getToken();
    this.headers = {};
  }

  sendRequest(method, url, data = null) {
    const config = {
      method,
      url,
      headers: this.headers,
    };

    if (this.token) {
      config.headers['Authorization'] = `Token ${this.token}`;
    }
    if (data) {
      config.data = data;
    }

    return this.axios(config);
  }

  getHealthcheck() {
    return this.axios.get('/');
  }

  postRegistration(data) {
    return this.sendRequest('post', '/auth/users/', data);
  }

  postLogin(data) {
    return this.sendRequest('post', '/auth/token/login/', data);
  }

  getUserData() {
    return this.sendRequest('get', '/auth/users/me/');
  }

  getUsers() {
    return this.sendRequest('get', '/auth/users/');
  }

  getUserById(id) {
    return this.sendRequest('get', `/auth/users/${id}/`);
  }

  patchUserInfo(id, data) {
    return this.sendRequest('patch', `/auth/users/${id}/`, data);
  }
}
