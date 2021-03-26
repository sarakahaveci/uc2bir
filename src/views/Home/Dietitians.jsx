import React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../components/typography/Titles';
import SliderFocus from '../../components/sliders/SliderFocus';

//mocdata
import * as Data from './MocData';

const Dietitians = (props) => {
  const query = true;

  const data = Data.Dietitians;
  const groups = 'Dietitians';
  const link = '/dietitians';
  return (
    <section className={`pt ${props.className}`}>
      <Container>
        <Title variant="h3" component="h3" lineDisable={false}>
          DİYETİSYENLER
        </Title>
        <Title variant="h6" component="h6" fontWeight="500" >
          SANA UYGUN DİYET PROGRAMINI, SANA ÖZEL DİYETİSYENLERLE BELİRLE
        </Title>
      </Container>
      <SliderFocus query={query} data={data} groups={groups} link={link} />
    </section>
  );
};

export default Dietitians;
