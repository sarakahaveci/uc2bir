import React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../components/typography/Titles';
import SliderFocus from '../../components/sliders/SliderFocus';

const Dietitians = (props) => {
  const query = false;

  const data = [];
  const groups = 'Dietitians';
  const link = '/dietitians';
  return (
    <section className={`pt ${props.className}`}>
      <Container>
        <Title variant="h3" component="h3">
          DİYETİSYENLER
        </Title>
        <Title variant="h5" component="h5" fontWeight="500" lineDisable>
          SANA UYGUN DİYET PROGRAMINI, SANA ÖZEL DİYETİSYENLERLE BELİRLE
        </Title>
      </Container>
      <SliderFocus query={query} data={data} groups={groups} link={link} />
    </section>
  );
};

export default Dietitians;
