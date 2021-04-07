import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { HomeUserSlider, Title } from 'components';

const Living = (props) => {
  const {
    content: { data: content },
  } = useSelector((state) => state.home);

  const link = '/gym';
  return (
    <section className={`pt ${props.className}`}>
      <Container>
        <Title variant="h3" lineDisable={false} component="h3">
          SALONLAR
        </Title>
        <Title variant="h6" component="h6" fontWeight="500">
          İSTEDİĞİN SALONDA ÇALIŞMA FIRSATI
        </Title>
      </Container>
      <HomeUserSlider data={content?.list_bs} link={link} />
    </section>
  );
};

export default Living;
