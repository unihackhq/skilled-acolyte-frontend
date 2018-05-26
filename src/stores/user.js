import { decorate, observable, computed, action, runInAction } from 'mobx';
import { apiPost } from '../utils/api';

class User {
  jwt = null;
  loading = false;
  error = null;

  get loggedIn() {
    return this.jwt !== null;
  }

  async login(token) {
    runInAction(() => {
      this.loading = true;
    });
    try {
      const resp = await apiPost(`/token`, { token });
      const { token: jwt } = await resp.json();

      runInAction(() => {
        this.loading = false;
        this.jwt = jwt;
        console.log(jwt);
      });
    } catch (error) {
      const { message } = error.body;
      runInAction(() => {
        this.loading = false;
        this.error = error.body;
      });
    }
  }

  logout() {
    this.jwt = null;
  }
}

export default decorate(User, {
  jwt: observable,
  loggedIn: computed,
  // login is async, so being action doesn't help it
  // login: action,
  logout: action,
});
