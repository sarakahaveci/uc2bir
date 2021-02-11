import React from 'react';

import { Main, Text, FormPages } from '../../components';
import RegisterSteps from './RegisterSteps';

const Register = () => {
  return (
    <Main>
      <FormPages>
        <section className="col-12 col-xl-6 page-info">
          <div className="row page-info-row">
            <div className="ballon">
              <Text
                style={{ letterSpacing: 5 }}
                fontFamily="'Montserrat', sans-serif"
                children="321 ve Yeni Bir Sen!"
                color="trunge"
              />
              <Text
                fontFamily="'Bebas Neue', cursive"
                fontSize="2em"
                children="HER AN HER YERDE"
                color="softDark"
              />
              <Text
                fontFamily="'Montserrat', sans-serif"
                fontSize="10pt"
                children="Hedeflerine uygun antrenman planları ile İçindeki atleti özgür bırak"
              />
            </div>
          </div>
        </section>
        <section className="col-12 col-xl-6 page login-page-widget">
          <div className="row">
            <div className="page-content">
              <div className="contain">
                <RegisterSteps />
              </div>
            </div>
          </div>
        </section>
      </FormPages>
    </Main>
  );
};

export default Register;
