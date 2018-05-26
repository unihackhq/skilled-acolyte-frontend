import React from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import LoginEntry from './components/LoginEntry';
import User from './stores/user';

const userStore = new User();

const App = () => (
  <Router>
    <Provider user={userStore}>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login/:token" component={LoginEntry} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Provider>
  </Router>
);

export default App;
