import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { Text, Accordion, Title } from 'components';
import ProficiencyImage from 'assets/proficiency.png';
import ProficiencyRow from './ProficiencyRow';

const mockData = [
  {
    sport: 'Fitness',
    sportIcon: 1,
    infoArr: [
      {
        name: 'Medikal Egzersiz Uzmanlığı',
        status: 'accepted',
      },
      {
        name: 'Medikal Egzersiz Uzmanlığı',
        status: 'pending',
      },

      {
        name: 'Medikal Egzersiz Uzmanlığı',
        status: 'pending',
      },
    ],
  },
  {
    sport: 'Yoga',
    sportIcon: 1,
    infoArr: [
      {
        name: 'Medikal Egzersiz Uzmanlığı',
        status: 'accepted',
      },
      {
        name: 'Medikal Egzersiz Uzmanlığı',
        status: 'pending',
      },

      {
        name: 'Medikal Egzersiz Uzmanlığı',
        status: 'pending',
      },
    ],
  },
];

const Proficiency = () => {
  return (
    <div className="proficiency">
      <Title variant="h5" textAlign="left" className="proficiency__title">
        Uzmanlıklarım
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
            Uzmanlıklarım
          </Text>

          <Text color="dark" fontSize="0.9rem" fontWeight="500" mb="10px">
            Branşlarınıza ait uzmanlıklarınızı giriniz.
          </Text>

          <Accordion>
            {mockData.map((item) => (
              <ProficiencyRow {...item} />
            ))}
          </Accordion>
        </Col>
      </Row>
    </div>
  );
};

export default Proficiency;
