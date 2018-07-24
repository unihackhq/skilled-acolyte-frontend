import React from 'react';
import { Provider } from 'mobx-react';
import { configure, reaction } from 'mobx';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './components/Nav';
import StoreErrors from './components/StoreErrors';
import User from './stores/user';
import Events from './stores/events';
import Teams from './stores/teams';
import InvitesStore from './stores/invites';
import Routes from './Routes';

configure({ enforceActions: true });
const userStore = new User();
const eventStore = new Events();
const teamStore = new Teams();
const inviteStore = new InvitesStore();

// clear data when user logs out
reaction(
  () => userStore.loggedIn,
  (loggedIn) => {
    if (!loggedIn) {
      eventStore.clear();
      teamStore.clear();
      inviteStore.clear();
    }
  },
);

const App = () => (
  <Router>
    <Provider
      user={userStore}
      events={eventStore}
      teams={teamStore}
      invites={inviteStore}
    >
      <React.Fragment>
        <Nav />
        <StoreErrors />
        <Routes />
      </React.Fragment>
    </Provider>
  </Router>
);

export default App;
