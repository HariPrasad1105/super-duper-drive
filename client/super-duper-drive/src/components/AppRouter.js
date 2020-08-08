import React from 'react';
import Login from './Login';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import Signup from './Signup';

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </Router>
  );
}
