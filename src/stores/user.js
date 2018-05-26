import { decorate, observable, computed, action, runInAction } from 'mobx';

class User {
  jwt = null;

  get loggedIn() {
    return this.jwt !== null;
  }

  login(token) {
    setTimeout(
      () => runInAction('setJwt', () => {
        this.jwt = '1234';
      }),
      3000
    );
  }

  logout() {
    this.jwt = null;
  }
}

export default decorate(User, {
  jwt: observable,
  loggedIn: computed,
  login: action,
  logout: action,
});
