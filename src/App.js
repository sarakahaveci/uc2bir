import React, { useState, useLayoutEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './views/Layout';
import { useDispatch } from 'react-redux';
import { setUserDetailsFromStorage, getRegisterData } from 'actions';
import { ThemeProvider } from 'styled-components';

import { ScrollToTop, Spinner } from 'components';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
//views
import Home from './views/Home';
import Login from './views/Login';
import Info from './views/Info';
import Register from './views/Register';
import ProfRegister from './views/ProfRegister';
import NotFoundPage from './views/NotFoundPage';
import ForgotPassword from 'views/ForgotPassword';
import Profile from 'views/Profile';
import UserProfile from 'views/UserProfile';
import Components from 'views/Components';
import { theme } from 'utils';
import Notifications from 'views/ProfileSettings/Notifications';

const App = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setLoading(false);
    dispatch(setUserDetailsFromStorage());
    dispatch(getRegisterData());
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <ScrollToTop>
      <Router>
        <ThemeProvider theme={theme}>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/info" component={Info} />
              <Route exact path="/register" component={Register} />
              <Route
                exact
                path="/profesyonel/register"
                component={ProfRegister}
              />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route exact path="/profile/:id" component={Profile} />

              <ProtectedRoute
                exact
                path="/myprofile/settings"
                component={UserProfile}
              />
              <ProtectedRoute
                exact
                path="/myprofile/settings/notifications"
                component={Notifications}
              />
              <Route exact path="/components" component={Components} />
              <Route component={NotFoundPage} />
            </Switch>
          </Layout>
        </ThemeProvider>
      </Router>
    </ScrollToTop>
  );
};

export default App;
