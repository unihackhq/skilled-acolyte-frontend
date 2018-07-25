import { observable, computed, action, runInAction } from 'mobx';
import jwtDecode from 'jwt-decode';
import { apiPostNoAuth, apiGet } from '../utils/api';

class User {
  @observable jwt = null;
  @observable error = null;
  @observable fetching = false;
  @observable details = null;

  constructor() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      // continue from last session
      this.jwt = jwt;
      this.fetchDetails();
    }
  }

  @computed
  get loggedIn() {
    return this.details !== null;
  }

  @action.bound
  setJwt(jwt) {
    this.jwt = jwt;

    if (jwt) {
      localStorage.setItem('jwt', jwt);
    } else {
      localStorage.removeItem('jwt');
    }
  }

  @action.bound
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

  @action.bound
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

  @action.bound
  apiFail(error) {
    this.error = error.body.message;
    this.fetching = false;
  }

  @action.bound
  logout() {
    this.setJwt(null);
    this.clear();
  }

  @action.bound
  clear() {
    this.jwt = null;
    this.error = null;
    this.fetching = false;
    this.details = null;
  }
}

export default User;
