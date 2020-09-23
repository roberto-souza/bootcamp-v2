import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/forgot-password" component={ForgotPassword} />
    <Route exact path="/reset" component={ResetPassword} />

    <Route exact path="/dashboard" component={Dashboard} isPrivate />
    <Route exact path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
