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
    return this.sendRequest('post', '/api/users/', data);
  }

  postLogin(data) {
    return this.sendRequest('post', '/auth/token/login/', data);
  }

  getUserData() {
    return this.sendRequest('get', '/api/users/me/');
  }

  getUsers() {
    return this.sendRequest('get', '/api/users/');
  }

  getUserById(id) {
    return this.sendRequest('get', `/api/users/${id}/`);
  }

  patchUserInfo(id, data) {
    return this.sendRequest('patch', `/api/users/${id}/`, data);
  }

  getCompanies() {
    return this.sendRequest('get', '/api/companies/');
  }

  getCompanyById(id) {
    return this.sendRequest('get', `/api/companies/${id}/`);
  }

  leaveCompany() {
    return this.sendRequest('post', '/api/users/leave/');
  }

  deleteCompany(id) {
    return this.sendRequest('delete', `/api/companies/${id}/`);
  }

  patchCompanyInfo(id, data) {
    return this.sendRequest('patch', `/api/companies/${id}/`, data);
  }

  createCompany(data) {
    return this.sendRequest('post', '/api/companies/', data);
  }
}
