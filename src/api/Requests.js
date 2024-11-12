export class Requests {

  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  getHealthcheck() {
    return this.axios.get('/');
  }

  postRegistration(data) {
    return this.axios.post('/auth/users/', data);
  }

  postLogin(data) {
    return this.axios.post('/auth/token/login/', data);
  }

  getUserData(token) {
    return this.axios.get('/auth/users/me/', {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }

  getUsers(token) {
    return this.axios.get('/auth/users/', {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }

  getUserById(id, token) {
    return this.axios.get(`/auth/users/${id}/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }

  patchUserInfo(id, data, token) {
    return this.axios.patch(`/auth/users/${id}/`, data, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }

  patchVisibility(id, token) {
    return this.axios.patch(`/auth/users/${id}/`, {
      'visible': false,
    }, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  }
}