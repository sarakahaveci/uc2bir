import React, { useLayoutEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './views/Layout';
import { useDispatch } from 'react-redux';

//views
import Home from './views/Home';
import { setUserDetailsFromStorage } from 'actions';
import Login from './views/Login';
import Info from './views/Info';
import Register from './views/Register';
import ProfRegister from './views/ProfRegister';
import NotFoundPage from './views/NotFoundPage';
import { ScrollToTop } from 'components';
import ForgotPassword from 'views/ForgotPassword';
import UserDetails from 'views/UserDetails';

const App = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(setUserDetailsFromStorage());
  }, []);

  return (
    <ScrollToTop>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/info" component={Info} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profesyonel/register" component={ProfRegister} />
          <Route path="/user/details" component={UserDetails} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    </ScrollToTop>
  );
};

export default App;
