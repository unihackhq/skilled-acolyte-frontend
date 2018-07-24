import React from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Route, Switch, withRouter } from 'react-router-dom';
import withLazyLoad from './utils/lazyLoad';
import FirstLaunchRedirect from './components/FirstLaunchRedirect';

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
const Profile = withLazyLoad(() => import('./components/Profile'));
const FirstLaunch = withLazyLoad(() => import('./components/FirstLaunch'));
const Schedule = withLazyLoad(() => import('./components/Schedule'));
const Event = withLazyLoad(() => import('./components/Event'));

// HOC to restrict access to a component when user isn't logged in
const restricted = (C) => {
  const Restricted = (props) => {
    const { user, ...rest } = props;

    if (!user.loggedIn) {
      return <FourOhThree />;
    }

    return <C {...rest} />;
  };
  Restricted.propTypes = {
    user: MobxPropTypes.observableObject.isRequired,
  };

  return inject('user')(observer(Restricted));
};

const Routes = ({ user, events, teams, invites }) => {
  // hide routes if there is an error
  if (user.error || events.error || teams.error || invites.error) {
    return null;
  }

  return (
    <React.Fragment>
      {/* First launch needs special attention. A redirect always gets
        rendered because we might need to redirect to first launch */}
      <Route path="/first-launch">{props => <FirstLaunchRedirect {...props} />}</Route>
      <Switch>
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
        <Route path="/profile" component={restricted(Profile)} />
        <Route exact path="/first-launch" component={restricted(FirstLaunch)} />
        <Route exact path="/schedule" component={restricted(Schedule)} />
        <Route exact path="/event" component={restricted(Event)} />
        <Route exact path="/" component={Home} />
        <Route component={FourOhFour} />
      </Switch>
    </React.Fragment>
  );
};
Routes.propTypes = {
  user: MobxPropTypes.observableObject.isRequired,
  events: MobxPropTypes.observableObject.isRequired,
  teams: MobxPropTypes.observableObject.isRequired,
  invites: MobxPropTypes.observableObject.isRequired,
};

export default withRouter(inject('user', 'events', 'teams', 'invites')(observer(Routes)));
