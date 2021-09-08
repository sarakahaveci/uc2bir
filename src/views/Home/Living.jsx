import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { HomeUserSlider, Title } from 'components';
const Living = (props) => {
  const { t } = useTranslation();

  const history = useHistory();
  const handleSeeMoreClick = () => {
    history.push('/find?type=gym');
  };
  const {
    content: { data: content },
  } = useSelector((state) => state.home);

  // You can delete it later
  if ((content?.list_bs || []).length === 0) {
    return <> </>;
  }

  const link = '/gym';
  return (
    <section className={`pt ${props.className}`}>
      <Container>
        <Title
          variant="h3"
          lineDisable={false}
          component="h3"
          letterSpacing="100"
          fontWeight="600"
        >
          {t('GYMS')}
        </Title>
        <Title variant="h6" component="h6" fontWeight="500">
          {t('OPPORTUNITY TO WORK IN THE HALL YOU WANT')}
        </Title>
      </Container>
      <HomeUserSlider
        handleSeeMoreClick={handleSeeMoreClick}
        data={content?.list_bs || []}
        //data={data}
        link={link}
      />
    </section>
  );
};

export default Living;
