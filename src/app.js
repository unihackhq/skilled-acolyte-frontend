import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/global/nav';
import Home from './components/home';
import Login from './components/login';
import Team from './components/team';
import '../styles/index.scss';

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/team" component={Team} />
      </div>
    </Router>
  </Provider>
);
export default App;
