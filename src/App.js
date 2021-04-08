import React, { useState, useLayoutEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import { ScrollToTop, ProtectedRoute } from 'components';
import LoadingImage from 'assets/321-loading.gif';
import {
  setUserDetailsFromStorage,
  getRegisterData,
  getAllPTBranchList,
} from 'actions';
//views
import Layout from './views/Layout';
import Home from './views/Home';
import Login from './views/Login';
import Info from './views/Info';
import Register from './views/Register';
import ProfRegister from './views/ProfRegister';
import NotFoundPage from './views/NotFoundPage';
import ForgotPassword from 'views/ForgotPassword';
import Profile from 'views/Profile';
import UserProfile from 'views/ProfileSettings';
import Message from 'views/Message';
import { theme } from 'utils';
import BlogDetail from 'views/BlogDetail';
import BlogList from 'views/BlogList';
import Contact from 'views/Contact';
import SearchProfessional from 'views/SearchProfessional';
import Interceptor from './Interceptor';

const App = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);

    dispatch(setUserDetailsFromStorage());

    dispatch(getRegisterData());
    dispatch(getAllPTBranchList());
  }, []);

  if (loading) {
    return (
      <LoadingWrapper>
        <img width="20%" src={LoadingImage} alt="Üç2Bir" />
      </LoadingWrapper>
    );
  }

  return (
    <Router>
      <Interceptor>
        <ScrollToTop>
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
                <Route
                  exact
                  path="/forgot-password"
                  component={ForgotPassword}
                />

                <ProtectedRoute
                  exact
                  path="/user/:id/:activeTabKey?"
                  component={Profile}
                />
                <ProtectedRoute
                  exact
                  path="/myprofile/settings/:activeTabKey"
                  component={UserProfile}
                />

                <Route exact path="/blog-detail/:seo" component={BlogDetail} />
                <Route exact path="/blog-list" component={BlogList} />

                <Route exact path="/messages" component={Message} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/find" component={SearchProfessional} />
                <Route component={NotFoundPage} />
              </Switch>
            </Layout>
          </ThemeProvider>
        </ScrollToTop>
      </Interceptor>
    </Router>
  );
};

export default App;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000000;
  top: 0;
  left: 0;
`;
