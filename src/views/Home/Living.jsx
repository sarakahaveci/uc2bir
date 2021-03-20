import React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../components/typography/Titles';
import SliderFocus from '../../components/sliders/SliderFocus';

//mocdata
import * as Data from './MocData';

const Living = (props) => {
  const query = true;

  const data = Data.Gym;
  const groups = 'GYM';
  const link = '/gym';
  return (
    <section className={`pt ${props.className}`}>
      <Container>
        <Title variant="h3" lineDisable={false} component="h3">
          SALONLAR
        </Title>
        <Title variant="h6" component="h6" fontWeight="500" >
          İSTEDİĞİN SALONDA ÇALIŞMA FIRSATI
        </Title>
      </Container>
      <SliderFocus query={query} data={data} groups={groups} link={link} />
    </section>
  );
};

export default Living;
