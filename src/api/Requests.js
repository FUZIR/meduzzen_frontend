import { getToken } from '../utils/Storage.js';

export class Requests {

  constructor(axiosInstance) {
    this.axios = axiosInstance;
    this.token = getToken();
    this.headers = {};
  }

  sendRequest(method, url, data = null) {
    const token = getToken();
    const config = {
      method,
      url,
      headers: this.headers,
    };

    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
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

  removeUser(data) {
    return this.sendRequest('post', '/api/companies/remove-user/', data);
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

  //   INVITATIONS
  createInvitation(data) {
    return this.sendRequest('post', '/api/invitations/', data);
  }

  invitationAccept(data) {
    return this.sendRequest('patch', '/api/invitations/invitation-accept/', data);
  }

  invitationReject(data) {
    return this.sendRequest('patch', '/api/invitations/invitation-reject/', data);
  }

  invitationRevoke(data) {
    return this.sendRequest('patch', '/api/invitations/invitation-revoke/', data);
  }

  getCompanyInvitations(companyId) {
    return this.sendRequest('get', `/api/invitations/get-invitations/?company=${companyId}`);
  }

  getUserInvitations() {
    return this.sendRequest('get', '/api/invitations/');
  }

  //    REQUESTS
  createRequests(data) {
    return this.sendRequest('post', '/api/requests/', data);
  }

  requestAccept(data) {
    return this.sendRequest('patch', '/api/requests/request-accept/', data);
  }

  requestReject(data) {
    return this.sendRequest('patch', '/api/requests/request-reject/', data);
  }

  requestsCancel(data) {
    return this.sendRequest('patch', '/api/requests/request-cancel/', data);
  }

  getCompanyRequests(companyId) {
    return this.sendRequest('get', `/api/requests/request-list/?company=${companyId}`);
  }

  getUserRequests() {
    return this.sendRequest('get', '/api/requests/');
  }

  appointAdmin(data) {
    return this.sendRequest('post', '/api/companies/appoint-admin/', data);
  }

  removeAdmin(data) {
    return this.sendRequest('post', '/api/companies/remove-admin/', data);
  }

  getAdmins(companyId) {
    return this.sendRequest('get', `/api/companies/admins/?company=${companyId}`);
  }

  getCompanyQuizzes(companyId, page) {
    return this.sendRequest('get', `/api/quizzes/?company=${companyId}&page=${page}`);
  }

  createCompanyQuiz(data) {
    return this.sendRequest('post', `/api/quizzes/`, data);
  }

  updateCompanyQuiz(quiz_id, data) {
    return this.sendRequest('put', `/api/quizzes/${quiz_id}/`, data);
  }

  deleteCompanyQuiz(quiz_id) {
    return this.sendRequest('delete', `/api/quizzes/${quiz_id}/`);
  }
}
