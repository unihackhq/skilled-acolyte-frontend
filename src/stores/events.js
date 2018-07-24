import { decorate, observable, computed, action, runInAction } from 'mobx';
import jwtDecode from 'jwt-decode';
import { apiGet } from '../utils/api';

class Events {
  list = null;
  error = null;
  fetching = false;
  selectedId = null;
  attendees = null;
  schedule = null;

  get fetched() {
    return this.list !== null;
  }

  get loading() {
    return this.fetching || !this.fetched;
  }

  get selected() {
    if (!this.selectedId) {
      return null;
    }

    return this.list.find(event => event.id === this.selectedId) || null;
  }

  changeSelected(id) {
    this.selectedId = id;
    this.attendees = null;
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

            // set default event
            if (!this.selectedId && events.length > 0) {
              this.selectedId = events[0].id;
            }
          });
        },
        error => this.apiFail(error),
      );
  }

  fetchAttendees() {
    // if we're logged in, jwt is in localstorage
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      this.error = 'You need to log in!';
      return;
    }

    apiGet(`/events/${this.selectedId}/attendees`)
      .then(
        async (resp) => {
          const students = await resp.json();

          runInAction('fetchSuccess', () => {
            this.attendees = students;
          });
        },
        error => this.apiFail(error),
      );
  }

  fetchSchedule() {
    // if we're logged in, jwt is in localstorage
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      this.error = 'You need to log in!';
      return;
    }

    apiGet(`/events/${this.selectedId}/schedule`)
      .then(
        async (resp) => {
          const schedule = await resp.json();

          runInAction('fetchSuccess', () => {
            this.schedule = schedule;
          });
        },
        error => this.apiFail(error),
      );
  }

  apiFail(error) {
    this.error = error.body.message;
    this.fetching = false;
  }

  clear() {
    this.list = null;
    this.error = null;
    this.fetching = false;
    this.selectedId = null;
    this.attendees = null;
    this.schedule = null;
  }
}

export default decorate(Events, {
  list: observable,
  error: observable,
  fetching: observable,
  selectedId: observable,
  attendees: observable,
  schedule: observable,
  fetched: computed,
  loading: computed,
  selected: computed,
  changeSelected: action.bound,
  fetchList: action.bound,
  fetchAttendees: action.bound,
  fetchSchedule: action.bound,
  apiFail: action.bound,
  clear: action.bound,
});
