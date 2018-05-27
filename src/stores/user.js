import { decorate, observable, computed, action, runInAction } from 'mobx';
import jwtDecode from 'jwt-decode';
import { apiPostNoAuth, apiGet } from '../utils/api';

class User {
  jwt = null;
  error = null;
  details = null;

  constructor() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      // continue from last session
      this.jwt = jwt;
      this.fetchDetails();
    }
  }

  setJwt(jwt) {
    this.jwt = jwt;
    localStorage.setItem('jwt', jwt);
  }

  get loggedIn() {
    return this.details !== null;
  }

  async login(token) {
    try {
      const resp = await apiPostNoAuth('/token', { token });
      const { token: jwt } = await resp.json();

      runInAction('loginSuccess', () => {
        this.setJwt(jwt);
        this.fetchDetails();
      });
    } catch (error) {
      const { message } = error.body;

      runInAction('loginFail', () => {
        this.error = message;
      });
    }
  }

  get id() {
    return jwtDecode(this.jwt).userId;
  }

  async fetchDetails() {
    try {
      const resp = await apiGet(`/students/${this.id}`, this.jwt);
      const details = await resp.json();

      runInAction('fetchSuccess', () => {
        this.details = details;
      });
    } catch (error) {
      const { message } = error.body;

      runInAction('fetchFail', () => {
        this.error = message;
      });
    }
  }

  logout() {
    this.setJwt(null);
    this.error = null;
    this.details = null;
  }
}

export default decorate(User, {
  jwt: observable,
  error: observable,
  details: observable,
  loggedIn: computed,
  id: computed,
  setJwt: action,
  logout: action,
});
