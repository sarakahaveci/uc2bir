import React from 'react';
import styled from 'styled-components/macro';

import { Accordion } from 'components';
import CardHeader from '../../components/BranchCardHeader';
import BranchCardBody from '../../components/BranchCardBody';

const mockData = [
  {
    sportType: 1,
    sportName: 'FITNESS',
    level: 'A',
    price: 150,
    speciality: [
      'Medikal Egzersiz Uzmanlığı',
      'Medikal Egzersiz Uzmanlığı',
      'Medikal Egzersiz Uzmanlığı',
    ],
  },
  {
    sportType: 1,
    sportName: 'FITNESS',
    level: 'A',
    price: 150,
    speciality: [
      'Medikal Egzersiz Uzmanlığı',
      'Medikal Egzersiz Uzmanlığı',
      'Medikal Egzersiz Uzmanlığı',
    ],
  },
  {
    sportType: 1,
    sportName: 'FITNESS',
    level: 'A',
    price: 150,
    speciality: [
      'Medikal Egzersiz Uzmanlığı',
      'Medikal Egzersiz Uzmanlığı',
      'Medikal Egzersiz Uzmanlığı',
    ],
  },
  {
    sportType: 1,
    sportName: 'FITNESS',
    level: 'A',
    price: 150,
    speciality: [
      'Medikal Egzersiz Uzmanlığı',
      'Medikal Egzersiz Uzmanlığı',
      'Medikal Egzersiz Uzmanlığı',
    ],
  },
];

const UserDetails = () => {
  return (
    <div>
      <Accordion>
        {mockData.map((item) => {
          const { sportType, sportName, level, price, speciality } = item;

          return (
            <Accordion.Item>
              <Accordion.Toggle>
                <CardHeader
                  sportType={sportType}
                  sportName={sportName}
                  level={level}
                  price={price}
                />
              </Accordion.Toggle>

              <Accordion.Collapse>
                <BranchCardBody speciality={speciality} />
              </Accordion.Collapse>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};

export default UserDetails;
