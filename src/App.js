import React from 'react';
import { Provider, observer } from 'mobx-react';
import { configure } from 'mobx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withLazyLoad from './utils/lazyLoad';
import Nav from './components/Nav';
import User from './stores/user';
import Events from './stores/events';
import Teams from './stores/teams';
import InvitesStore from './stores/invites';

const Home = withLazyLoad(() => import('./components/Home'));
const Login = withLazyLoad(() => import('./components/Login'));
const LoginEntry = withLazyLoad(() => import('./components/LoginEntry'));
const Team = withLazyLoad(() => import('./components/Team'));
const Invites = withLazyLoad(() => import('./components/Invites'));
const FourOhThree = withLazyLoad(() => import('./components/FourOhThree'));
const FourOhFour = withLazyLoad(() => import('./components/FourOhFour'));
const AdminEntry = withLazyLoad(() => import('./components/AdminEntry'));
const Admin = withLazyLoad(() => import('./components/Admin'));
const AdminStudents = withLazyLoad(() => import('./components/AdminStudents'));

configure({ enforceActions: true });
const userStore = new User();
const eventStore = new Events();
const teamStore = new Teams();
const inviteStore = new InvitesStore();

// HOC to restrict access to a component when user isn't logged in
const restricted = (C) => {
  // this component has access to user so it will decide to allow or deny access
  const Restricted = observer(
    (props) => {
      const { user, ...rest } = props;

      if (!user.loggedIn) {
        return <FourOhThree />;
      }

      return <C {...rest} />;
    },
  );

  // we need to pass user store to our component
  return props => <Restricted user={userStore} {...props} />;
};

const App = () => (
  <Router>
    <Provider
      user={userStore}
      events={eventStore}
      teams={teamStore}
      invites={inviteStore}
    >
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login/:token" component={LoginEntry} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin/entry/:token" component={AdminEntry} />
          <Route exact path="/admin/students" component={AdminStudents} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/team" component={restricted(Team)} />
          <Route exact path="/invites" component={restricted(Invites)} />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    </Provider>
  </Router>
);

export default App;
