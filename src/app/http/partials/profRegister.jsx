// @ts-nocheck
import React from 'react';
import Main from '../../sub-page/Main';
import SubPages from '../../sub-page/SubPages';
import Layout from '../layout';

import ProffesionalRegister from '../../sub-page/profRegister/ProffesionalRegister';

const Register = () => {
  return (
    <Layout>
      <Main className="main">
        <SubPages>
          <ProffesionalRegister />
        </SubPages>
      </Main>
    </Layout>
  );
};

export default Register;
