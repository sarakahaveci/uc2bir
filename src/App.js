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
import Message from 'views/Message';
import { theme } from 'utils';
import BlogDetail from 'views/BlogDetail';
import BlogList from 'views/BlogList';

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

              <ProtectedRoute
                exact
                path="/profile/:activeTabKey"
                component={Profile}
              />
              <ProtectedRoute
                exact
                path="/myprofile/settings/:activeTabKey"
                component={UserProfile}
              />

              <Route exact path="/components" component={Components} />

              <Route exact path="/blog-detail/:seo" component={BlogDetail} />
              <Route exact path="/blog-list" component={BlogList} />
              
              <Route exact path="/messages" component={Message} />
              <Route component={NotFoundPage} />
            </Switch>
          </Layout>
        </ThemeProvider>
      </Router>
    </ScrollToTop>
  );
};

export default App;
