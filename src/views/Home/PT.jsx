// @ts-nocheck
import React from 'react';
import { Container } from 'react-bootstrap';
import cx from 'classnames';

import Title from 'components/typography/Titles';
import SliderFocus from 'components/sliders/SliderFocus';

//mocdata
import * as Data from './MocData';

const PT = ({className}) => {
  const query = true;

  const data = Data.Pt;
  const groups = 'PT';
  const link = '/instructor';
  return (
    <section  className={cx({ [`${className}`]: className })}>
      <Container>
        <Title variant="h3" lineDisable={false} component="h3">
          EĞİTMENLER
        </Title>
        <Title variant="h6" component="h6" fontWeight="500" >
          EN İYİ EĞİTMENLER İLE ÇALIŞMA FIRSATI
        </Title>
      </Container>
      <SliderFocus query={query} data={data} groups={groups} link={link} />
    </section>
  );
};

export default PT;
