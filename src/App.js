import React, { useLayoutEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './views/Layout';
import { useDispatch } from 'react-redux';
import { setUserDetailsFromStorage } from 'actions';
import { ThemeProvider } from 'styled-components';

import { ScrollToTop } from 'components';
//views
import Home from './views/Home';
import Login from './views/Login';
import Info from './views/Info';
import Register from './views/Register';
import ProfRegister from './views/ProfRegister';
import NotFoundPage from './views/NotFoundPage';
import ForgotPassword from 'views/ForgotPassword';
import Profile from 'views/Profile';
import ProfileSettings from 'views/ProfileSettings';
import Components from 'views/Components';
import { theme } from 'utils';

const App = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(setUserDetailsFromStorage());
  }, []);

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
              <Route
                exact
                path="/profile/settings"
                component={ProfileSettings}
              />
              <Route exact path="/profile/:id" component={Profile} />
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
