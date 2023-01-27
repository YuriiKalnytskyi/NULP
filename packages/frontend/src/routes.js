import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './components/Main';
import ForgotPasswordStep1 from './components/auth/ForgotPasswordStep1';
import ForgotPasswordStep2 from './components/auth/ForgotPasswordStep2';
import ForgotPasswordStep3 from './components/auth/ForgotPasswordStep3';
import Registration from './components/auth/Registration';
import Login from './components/auth/Login';

export const useRouters = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/all" component={Main} />
      </Switch>
    );
  }
  if (!isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/" component={Registration} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/password-forgot-step-1" component={ForgotPasswordStep1} />
        <Route exact path="/password-forgot-step-2" component={ForgotPasswordStep2} />
        <Route exact path="/password-forgot-step-3" component={ForgotPasswordStep3} />
      </Switch>
    );
  }
};
