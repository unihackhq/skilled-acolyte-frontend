import { decorate, observable, computed, action, runInAction } from 'mobx';
import jwtDecode from 'jwt-decode';
import { apiPostNoAuth, apiGet } from '../utils/api';

class User {
  jwt = null;
  loading = true;
  error = null;
  details = null;

  get loggedIn() {
    return this.details !== null;
  }

  async login(token) {
    try {
      const resp = await apiPostNoAuth('/token', { token });
      const { token: jwt } = await resp.json();

      runInAction('loginSuccess', () => {
        this.jwt = jwt;
        this.fetchDetails();
      });
    } catch (error) {
      const { message } = error.body;

      runInAction('loginFail', () => {
        this.error = message;
        this.loading = false;
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
        this.loading = false;
      });
    } catch (error) {
      const { message } = error.body;

      runInAction('fetchFail', () => {
        this.error = message;
        this.loading = false;
      });
    }
  }

  logout() {
    this.jwt = null;
    this.loading = true;
    this.error = null;
    this.details = null;
  }
}

export default decorate(User, {
  jwt: observable,
  loading: observable,
  error: observable,
  details: observable,
  loggedIn: computed,
  id: computed,
  logout: action,
});
