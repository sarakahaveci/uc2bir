import React from 'react';

import { Main, Text, FormPages } from '../../components';
import RegisterSteps from './RegisterSteps';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();

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
                {t('321 and a New You')}!
              </Text>
              <Text
                fontFamily="'Bebas Neue', cursive"
                fontSize="2em"
                color="softDark"
              >
                {t('TRAIN WHEN YOU WANT ANYTIME ANYWHERE')}
              </Text>
              <Text fontFamily="'Montserrat', sans-serif" fontSize="10pt">
                {t(
                  'Unleash your inner athlete with training plans that fit your goals'
                )}
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
