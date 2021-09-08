import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getProficiency } from 'actions';
import { Text, Accordion, Title } from 'components';
import ProficiencyImage from 'assets/proficiency.png';
import ProficiencyRow from './ProficiencyRow';

const Proficiency = () => {
  const { t } = useTranslation();

  const { data: proficiencyData } = useSelector(
    (state) => state.profileSettings2.proficiencySettings.proficiency
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProficiency());
  }, []);

  return (
    <div className="proficiency">
      <Title variant="h5" textAlign="left" className="proficiency__title">
        {t('my specialties')}
      </Title>

      <Row>
        <Col lg={3}>
          <img
            src={ProficiencyImage}
            width="100%"
            className="proficiency__img"
          />
        </Col>

        <Col lg={6} className="proficiency__info">
          <Text color="dark" fontSize="1rem">
            {t('my specialties')}
          </Text>

          <Text color="dark" fontSize="0.9rem" fontWeight="500" mb="10px">
            {t('Enter your specializations for your branches')}
          </Text>

          <Accordion>
            {proficiencyData.map((item, index) => (
              <ProficiencyRow key={index} data={item} />
            ))}
          </Accordion>
        </Col>
      </Row>
    </div>
  );
};

export default Proficiency;
