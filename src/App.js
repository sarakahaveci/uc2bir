import React, { useLayoutEffect, useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
// import {Helmet} from "react-helmet";
import { ScrollToTop, ProtectedRoute } from 'components';
import LoadingImage from 'assets/321-loading.gif';
import {
  setUserDetailsFromStorage,
  getAllPTBranchList,
  getRegisterData,
  getNotificationCount,
} from 'actions';
//views
import Layout from './views/Layout';
import Home from './views/Home';
import Login from './views/Login';
import Info from './views/Info';
import Register from './views/Register';
import ProfRegister from './views/ProfRegister';
import NotFoundPage from './views/NotFoundPage';
import HeaderSearchResults from './views/HeaderSearchResults';
import ForgotPassword from 'views/ForgotPassword';
import Profile from 'views/Profile';
import UserProfile from 'views/ProfileSettings';
import Message from 'views/Message';
import BuyPacket from 'views/BuyPacket';
import BuyGroupLesson from 'views/BuyGroupLesson';

import SearchPackets from 'views/SearchPackets';
import SearchGroupLesson from 'views/SearchGroupLesson';

import { theme } from 'utils';
import BlogDetail from 'views/BlogDetail';
import MineBlogDetail from 'views/MineBlogDetail';

import BlogList from 'views/BlogList';
import Contact from 'views/Contact';
import SearchProfessional from 'views/SearchProfessional';
import Interceptor from './Interceptor';
import CookieConsent from './components/CookieConsent';
import MobileAppOpen from './components/MobileAppOpen';
import MembershipAgreement from './views/Footer/MembershipAgreement';
import StaticPage from './views/Footer/StaticPage';
import Online from 'views/Online';
import ReactGA from 'react-ga';

import BuyStatus from './views/BuyStatus';
const App = () => {
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  ReactGA.initialize('G-RG1WMQBY0S');

  useLayoutEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);

    dispatch(setUserDetailsFromStorage());
    dispatch(getRegisterData());
    if (auth?.isAuthenticated) {
      dispatch(getNotificationCount());
    }
    setInterval(() => {
      if (auth?.isAuthenticated) {
        dispatch(getNotificationCount());
      }
    }, 3 * 60000);
    dispatch(getAllPTBranchList());
  }, []);
  useEffect(() => {
    
  }, []);
  if (loading) {
    return (
      <LoadingWrapper>
        <img width="20%" src={LoadingImage} alt="Üç2Bir" />
      </LoadingWrapper>
    );
  }

  return (
    <>
    <Router>
      <MobileAppOpen />
      <CookieConsent />
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
                <Route
                  exact
                  path="/user/:id/:activeTabKey?"
                  component={Profile}
                />
                <ProtectedRoute
                  exact
                  path="/myprofile/settings/:activeTabKey"
                  component={UserProfile}
                />
                <ProtectedRoute
                  exact
                  path="/mine-blog/:id"
                  component={MineBlogDetail}
                />
                <ProtectedRoute
                  exact
                  path="/myprofile/online"
                  component={Online}
                />
                <Route exact path="/blog-detail/:seo" component={BlogDetail} />
                <Route exact path="/blog-list" component={BlogList} />

                <Route exact path="/messages/:id?" component={Message} />
                <Route exact path="/packets" component={SearchPackets} />
                <Route
                  exact
                  path="/group-lessons"
                  component={SearchGroupLesson}
                />

                <Route
                  exact
                  path="/packets/:type/detail/:id"
                  component={BuyPacket}
                />
                <Route
                  exact
                  path="/group-lessons/detail/:id"
                  component={BuyGroupLesson}
                />

                <Route exact path="/contact" component={Contact} />
                <Route exact path="/buy/:status" component={BuyStatus} />
                <Route exact path="/mobile/buy/:status" component={BuyStatus} />

                <Route exact path="/find" component={SearchProfessional} />
                <Route
                  exact
                  path="/membership-agreement"
                  component={MembershipAgreement}
                />
                <Route exact path="/static/:link" component={StaticPage} />

                {/* <Route
                  exact
                  path="/uye-mesafeli-hizmet-sozlesmesi"
                  component={UyeMesafeliHizmetSozlesmesi}
                />
                <Route
                  exact
                  path="/uye-aydinlatma-bildirimi"
                  component={UyeAydinlatmaBildirimi}
                />
                <Route
                  exact
                  path="/uye-on-bilgilendirme-formu"
                  component={UyeOnBilgilendirmeFormu}
                /> */}
                <Route
                  path="/search/:keyword"
                  component={HeaderSearchResults}
                />
                <Route component={NotFoundPage} />
              </Switch>
            </Layout>
          </ThemeProvider>
        </ScrollToTop>
      </Interceptor>
    </Router>
    </>
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
