import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { HomeUserSlider, Title } from 'components';

const Dietitians = (props) => {
  const {
    content: { data: content },
  } = useSelector((state) => state.home);

  const link = '/dietitians';

  // You can delete it later
  if ((content?.list_dt || []).length === 0) {
    return <> </>;
  }

  return (
    <section className={`pt ${props.className}`}>
      <Container>
        <Title variant="h3" component="h3" lineDisable={false}>
          DİYETİSYENLER
        </Title>
        <Title variant="h6" component="h6" fontWeight="500">
          SANA UYGUN DİYET PROGRAMINI, SANA ÖZEL DİYETİSYENLERLE BELİRLE
        </Title>
      </Container>
      <HomeUserSlider data={content.list_dt || []} link={link} />
    </section>
  );
};

export default Dietitians;
