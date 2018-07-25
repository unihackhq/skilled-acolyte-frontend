import { observable, computed, action, runInAction } from 'mobx';
import { createTransformer } from 'mobx-utils';
import jwtDecode from 'jwt-decode';
import { apiGet } from '../utils/api';

class Invites {
  @observable list = null;
  @observable error = null;
  @observable fetching = false;

  @computed
  get fetched() {
    return this.list !== null;
  }

  @computed
  get loading() {
    return this.fetching || !this.fetched;
  }

  @computed
  get count() {
    return this.fetched ? this.list.length : 0;
  }

  findByTeam = createTransformer(
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

    apiGet(`/students/${userId}/invites`)
      .then(
        async (resp) => {
          const invites = await resp.json();

          runInAction('fetchSuccess', () => {
            this.list = invites;
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
    this.error = null;
    this.fetching = false;
  }
}

export default Invites;
