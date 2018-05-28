import { decorate, observable, computed, action, runInAction } from 'mobx';
import jwtDecode from 'jwt-decode';
import { apiGet } from '../utils/api';

class Events {
  list = null;
  error = null;

  get fetched() {
    return this.list !== null;
  }

  fetchList() {
    // if we're logged in, jwt is in localstorage
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      this.error = 'You need to log in!';
      return;
    }

    const { userId } = jwtDecode(jwt);

    apiGet(`/students/${userId}/events`)
      .then(
        async (resp) => {
          const events = await resp.json();

          runInAction('fetchSuccess', () => {
            this.list = events;
          });
        },
        error => this.apiFail(error),
      );
  }

  apiFail(error) {
    this.error = error.body.message;
  }
}

export default decorate(Events, {
  list: observable,
  error: observable,
  fetched: computed,
  fetchList: action.bound,
  apiFail: action.bound,
});
