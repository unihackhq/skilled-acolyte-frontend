import { observable, computed, action, runInAction } from 'mobx';
import { createTransformer } from 'mobx-utils';
import jwtDecode from 'jwt-decode';
import { apiGet } from '../utils/api';

class Teams {
  @observable list = null;
  @observable fetching = false;
  @observable error = null;

  @computed
  get fetched() {
    return this.list !== null;
  }

  @computed
  get loading() {
    return this.fetching || !this.fetched;
  }

  findByEvent = createTransformer(
    eventId => this.list.filter(team => team.eventId === eventId),
  )

  findById = createTransformer(
    teamId => this.list.find(team => team.id === teamId) || null,
  )

  @action.bound
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

    apiGet(`/students/${userId}/teams`)
      .then(
        async (resp) => {
          const teams = await resp.json();

          runInAction('fetchSuccess', () => {
            this.list = teams;
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
  clear() {
    this.list = null;
    this.fetching = false;
    this.error = null;
  }
}

export default Teams;
