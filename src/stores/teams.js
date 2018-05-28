import { decorate, observable, computed, action, runInAction } from 'mobx';
import { createTransformer } from 'mobx-utils';
import jwtDecode from 'jwt-decode';
import { apiGet } from '../utils/api';

class Teams {
  list = null;
  error = null;

  get fetched() {
    return this.list !== null;
  }

  findByEvent = createTransformer(
    eventId => this.list.filter(team => team.eventId === eventId),
  )

  fetchList() {
    // if we're logged in, jwt is in localstorage
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      this.error = 'You need to log in!';
      return;
    }

    const { userId } = jwtDecode(jwt);

    apiGet(`/students/${userId}/teams`)
      .then(
        async (resp) => {
          const teams = await resp.json();

          runInAction('fetchSuccess', () => {
            this.list = teams;
          });
        },
        error => this.apiFail(error),
      );
  }

  append(team) {
    this.list.push(team);
  }

  apiFail(error) {
    this.error = error.body.message;
  }
}

export default decorate(Teams, {
  list: observable,
  error: observable,
  fetched: computed,
  fetchList: action.bound,
  append: action.bound,
  apiFail: action.bound,
});
