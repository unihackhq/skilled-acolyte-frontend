import { decorate, observable, computed, action, runInAction } from 'mobx';
import jwtDecode from 'jwt-decode';
import { apiGet } from '../utils/api';

class Events {
  list = null;
  error = null;
  fetching = false;

  get fetched() {
    return this.list !== null;
  }

  get loading() {
    return this.fetching || !this.fetched;
  }

  fetchList() {
    if (this.fetching) return;

    // if we're logged in, jwt is in localstorage
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      this.error = 'You need to log in!';
      return;
    }

    const { userId } = jwtDecode(jwt);
    this.fetching = true;

    apiGet(`/students/${userId}/events`)
      .then(
        async (resp) => {
          const events = await resp.json();

          runInAction('fetchSuccess', () => {
            this.list = events;
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
}

export default decorate(Events, {
  list: observable,
  error: observable,
  fetching: observable,
  fetched: computed,
  loading: computed,
  fetchList: action.bound,
  apiFail: action.bound,
});
