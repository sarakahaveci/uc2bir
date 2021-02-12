import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './views/Layout';

//views
import Home from './views/Home';
import Login from './views/Login';
import Info from './views/Info';
import Register from './views/Register';
import ProfRegister from './views/ProfRegister';
import NotFoundPage from './views/NotFoundPage';
import { ScrollToTop } from 'components';
import ForgotPassword from 'views/ForgotPassword';

const App = () => {
  return (
    <ScrollToTop>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/info" component={Info} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profesyonel/register" component={ProfRegister} />
          <Route exact path="/forgot-password" component={ForgotPassword}/>
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    </ScrollToTop>
  );
};

export default App;
