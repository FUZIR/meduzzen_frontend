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
}