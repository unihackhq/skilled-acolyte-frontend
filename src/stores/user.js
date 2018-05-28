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

  get loggedIn() {
    return this.details !== null;
  }

  setJwt(jwt) {
    this.jwt = jwt;

    if (jwt) {
      localStorage.setItem('jwt', jwt);
    } else {
      localStorage.removeItem('jwt');
    }
  }

  login(token) {
    apiPostNoAuth('/token', { token })
      .then(
        async (resp) => {
          const { token: jwt } = await resp.json();

          runInAction('loginSuccess', () => {
            this.setJwt(jwt);
            this.fetchDetails();
          });
        },
        error => this.apiFail(error),
      );
  }

  fetchDetails() {
    const { userId } = jwtDecode(this.jwt);

    apiGet(`/students/${userId}`, this.jwt)
      .then(
        async (resp) => {
          const details = await resp.json();

          runInAction('fetchSuccess', () => {
            this.details = details;
          });
        },
        error => this.apiFail(error),
      );
  }

  apiFail(error) {
    this.error = error.body.message;
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
  setJwt: action.bound,
  login: action.bound,
  fetchDetails: action.bound,
  apiFail: action.bound,
  logout: action.bound,
});
