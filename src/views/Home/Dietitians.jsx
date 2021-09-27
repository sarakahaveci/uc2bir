import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { HomeUserSlider, Title } from 'components';

const Dietitians = (props) => {
  const { t } = useTranslation();

  const history = useHistory();
  const handleSeeMoreClick = () => {
    history.push('/find?type=dt');
  };

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
        <Title
          variant="h3"
          component="h3"
          lineDisable={false}
          letterSpacing="100"
          fontWeight="600"
        >
          {t('dietitians')}
        </Title>
        <Title variant="h6" component="h6" fontWeight="500">
          {t(
            'DETERMINE THE DIET PROGRAM THAT IS SUITABLE FOR YOU WITH YOUR SPECIAL DIETICIANS'
          )}
        </Title>
      </Container>
      <HomeUserSlider
        handleSeeMoreClick={handleSeeMoreClick}
        data={content.list_dt || []}
        //data={data}
        link={link}
      />
    </section>
  );
};

export default Dietitians;
