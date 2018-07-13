import React from 'react';
import { Provider, observer } from 'mobx-react';
import { configure, reaction } from 'mobx';
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
const AdminEntry = withLazyLoad(() => import('./components/Admin/AdminEntry'));
const Admin = withLazyLoad(() => import('./components/Admin'));
const AdminStudents = withLazyLoad(() => import('./components/Admin/AdminStudents'));
const AdminTeams = withLazyLoad(() => import('./components/Admin/AdminTeams'));
const AdminEvents = withLazyLoad(() => import('./components/Admin/AdminEvents'));
const AdminTickets = withLazyLoad(() => import('./components/Admin/AdminTickets'));
const AdminStudentDetails = withLazyLoad(() => import('./components/Admin/AdminStudentDetails'));
const AdminTeamDetails = withLazyLoad(() => import('./components/Admin/AdminTeamDetails'));
const AdminEventDetails = withLazyLoad(() => import('./components/Admin/AdminEventDetails'));
const AdminTicketDetails = withLazyLoad(() => import('./components/Admin/AdminTicketDetails'));

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
      <React.Fragment>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login/:token" component={LoginEntry} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin/entry/:token" component={AdminEntry} />
          <Route exact path="/admin/students/:id" component={AdminStudentDetails} />
          <Route exact path="/admin/students" component={AdminStudents} />
          <Route exact path="/admin/teams/:id" component={AdminTeamDetails} />
          <Route exact path="/admin/teams" component={AdminTeams} />
          <Route exact path="/admin/events/:id" component={AdminEventDetails} />
          <Route exact path="/admin/events" component={AdminEvents} />
          <Route exact path="/admin/tickets/:id" component={AdminTicketDetails} />
          <Route exact path="/admin/tickets" component={AdminTickets} />
          <Route exact path="/admin" component={Admin} />
          <Route path="/team" component={restricted(Team)} />
          <Route exact path="/invites" component={restricted(Invites)} />
          <Route component={FourOhFour} />
        </Switch>
      </React.Fragment>
    </Provider>
  </Router>
);

export default App;
