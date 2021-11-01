import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Text, FormPages, Main, Title } from 'components';
import { DIETITIAN, WORK_PLACE } from '../../constants';
import RegisterSteps from './RegisterSteps';
import { useDispatch } from 'react-redux';
import { getRegisterData } from '../../actions';

const List = styled.ul`
  li {
    font-size: 1rem;
    color: var(--black2);
    font-weight: 500;
  }
`;

const ProfRegister = () => {
  const { t } = useTranslation();

  const [userTypeId, setUserTypeId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRegisterData());
  }, []);

  return (
    <Main>
      <FormPages>
        <section className="col-12 col-xl-6 page-info">
          <div className="row page-info-row">
            <div className="ballon">
              <Title
                variant="h5"
                style={{ letterSpacing: 5 }}
                fontSize="1.7rem"
                fontFamily="'Montserrat', sans-serif"
                color="trunge"
                lineDisable
              >
                {t('Come to ÜÇ2BİR')}
              </Title>

              <Text color="black2" fontSize="1rem" fontWeight="500">
                {t(
                  'Become a member of Üç2bir now and reach more sports fans, start earning more! Üç2bir is a sports-oriented digital platform that brings together all sports branch trainers and members and provides them with the opportunity to give private lessons. Join now to meet your real target audience and live your dream sports career. All you have to do is fill out the following documents. This place is for you!'
                )}
              </Text>

              {userTypeId && (
                <>
                  <Text color="black2" fontWeight="700">
                    {t('Documents Required for Registration')}
                  </Text>

                  <List>
                    {userTypeId === WORK_PLACE ? (
                      <>
                        <li>- {t('Provincial Youth and Sports General Directorate Working License')}</li>
                        <li>- {t('Business License')}</li>
                        <li>- {t('Tax Plate')}</li>
                        <li>- {t('Office Rental Decision')}</li>
                      </>
                    ) : (
                      <>
                        <li>- {t('Certificate')}</li>
                        <li>- {t('Diploma')}</li>
                        <li>- {t('Criminal Records')}</li>
                        <li>- {t('Birth certificate')}</li>
                        {userTypeId !== DIETITIAN ? (
                          <li>- {t('Health report')} </li>
                        ) : null}
                        <li>- {t('Photo')}</li>
                        {userTypeId !== DIETITIAN ? (
                          <li>- CV</li>
                        ) : null}
                      </>
                    )}
                  </List>
                </>
              )}
            </div>
          </div>
        </section>
        <section className="col-12 col-xl-6 page login-page-widget">
          <div className="row">
            <div className="page-content-register">
              <div className="contain">
                <RegisterSteps
                  userTypeId={userTypeId}
                  setUserTypeId={setUserTypeId}
                />
              </div>
            </div>
          </div>
        </section>
      </FormPages>
    </Main>
  );
};

export default ProfRegister;
