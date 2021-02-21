// @ts-nocheck
import React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../components/typography/Titles';
import SliderFocus from '../../components/sliders/SliderFocus';

//mocdata
import * as Data from './MocData';

const PT = (props) => {
  const query = true;

  const data = Data.Pt;
  const groups = 'PT';
  const link = '/instructor';
  return (
    <section className={`pt ${props.className}`}>
      <Container>
        <Title variant="h3" component="h3">
          EĞİTMENLER
        </Title>
        <Title variant="h5" component="h5" fontWeight="500" lineDisable>
          EN İYİ EĞİTMENLER İLE ÇALIŞMA FIRSATI
        </Title>
      </Container>
      <SliderFocus query={query} data={data} groups={groups} link={link} />
    </section>
  );
};

export default PT;
