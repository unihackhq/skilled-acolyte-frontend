import { decorate, observable, computed, action, runInAction } from 'mobx';
import jwtDecode from 'jwt-decode';
import { apiPostNoAuth, apiGet } from '../utils/api';

class User {
  jwt = null;
  error = null;
  fetching = false;
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
    if (this.fetching) return;
    this.fetching = true;

    const { userId } = jwtDecode(this.jwt);

    apiGet(`/students/${userId}`)
      .then(
        async (resp) => {
          const details = await resp.json();

          runInAction('fetchSuccess', () => {
            this.details = details;
            this.fetching = false;
          });
        },
        error => this.apiFail(error),
      );
  }

  apiFail(error) {
    this.error = error.body.message;
    this.fetching = false;
  }

  logout() {
    this.setJwt(null);
    this.error = null;
    this.fetching = false;
    this.details = null;
  }
}

export default decorate(User, {
  jwt: observable,
  error: observable,
  fetching: observable,
  details: observable,
  loggedIn: computed,
  setJwt: action.bound,
  login: action.bound,
  fetchDetails: action.bound,
  apiFail: action.bound,
  logout: action.bound,
});
