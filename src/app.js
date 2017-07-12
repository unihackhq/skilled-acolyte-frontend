import React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { selectors as userSelectors } from './ducks/user';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/global/nav';
import FourOhThree from './components/403';
import Home from './components/home';
import Login from './components/login';
import LoginEntry from './components/loginEntry';
import Logout from './components/logout';
import Team from './components/team';
import Register from './components/register';
import '../styles/index.scss';

const App = ({ store, loggedIn }) => {
  const PrivateRoute = ({ component: C, ...rest }) =>
    <Route {...rest} children={
      (props) => {
        if (loggedIn === false) {
          return <FourOhThree />;
        }
        return <C {...props} />;
      }
    } />;

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login/:token" component={LoginEntry} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <PrivateRoute path="/team" component={Team} />
            <Route path="/register/:token" component={Register} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

const stateMap = (state) => ({
  loggedIn: userSelectors.loggedIn(state)
});

export default connect(stateMap)(App);
