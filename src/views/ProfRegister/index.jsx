// @ts-nocheck
import React, { useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { getRegisterData } from '../../actions';
import { Text, FormPages, Main, Title } from '../../components';
import RegisterSteps from './RegisterSteps/RegisterSteps';

const List = styled.ul`
  li {
    font-size: 1rem;
    color: var(--black2);
    font-weight: 500;
  }
`;

const ProfRegister = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
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
                HAYDİ ÜÇ2BİR'E
              </Title>

              <Text color="black2" fontSize="1rem" fontWeight="500">
                Üç2bir’e hemen üye olup daha fazla sporsevere ulaş, daha fazla
                kazanmaya başla! Üç2bir, tüm spor branş eğitmenleriyle üyelerini
                bir araya getiren ve onlara özel ders verme olanağı sağlayan,
                spor odaklı bir dijital platformdur. Sen de gerçek hedef
                kitlenle buluşmak, hayalindeki spor kariyerini yaşamak için
                hemen katıl. Yapman gereken sadece aşağıdaki belgeleri
                doldurmak. Burası tam sana göre!
              </Text>

              <Text color="black2" fontWeight="700">
                Kayıt için Gerekli Belgeler
              </Text>

              <List>
                <li>- Sertifika/Diploma</li>
                <li>- Adli Sicil Kaydı</li>
                <li>- Nüfus Cüzdanı</li>
                <li>- Sağlık Raporu </li>
                <li>- Fotoğraf</li>
              </List>
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

export default ProfRegister;
