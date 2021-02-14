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
                color="trunge"
              >
                321 ve Yeni Bir Sen!
              </Text>
              <Text
                fontFamily="'Bebas Neue', cursive"
                fontSize="2em"
                color="softDark"
              >
                HER AN HER YERDE İSTEDİĞİN GİBİ ANTRENMAN YAP
              </Text>
              <Text
                fontFamily="'Montserrat', sans-serif"
                fontSize="10pt"
              >
                Hedeflerine uygun antrenman planları ile İçindeki atleti özgür bırak
              </Text>
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
