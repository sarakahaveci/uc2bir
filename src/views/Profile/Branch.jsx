import React from 'react';
import styled from 'styled-components/macro';

import { Accordion, Svg } from 'components';
import BranchCardHeader from '../../components/BranchCard/BranchCardHeader';
import BranchCardBody from '../../components/BranchCard/BranchCardBody';

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
    sportType: 2,
    sportName: 'YOGA',
    level: 'A',
    price: 150,
    speciality: [
      'Medikal Egzersiz Uzmanlığı',
      'Medikal Egzersiz Uzmanlığı',
      'Medikal Egzersiz Uzmanlığı',
    ],
  },
  {
    sportType: 3,
    sportName: 'PLATES',
    level: 'A',
    price: 150,
    speciality: [
      'Medikal Egzersiz Uzmanlığı',
      'Medikal Egzersiz Uzmanlığı',
      'Medikal Egzersiz Uzmanlığı',
    ],
  },
  {
    sportType: 4,
    sportName: 'TENIS',
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
            <AccordionItem>
              <Accordion.Item>
                <Accordion.Toggle>
                  <BranchCardHeader
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
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default UserDetails;

const AccordionItem = styled.div`
  margin-bottom: 30px;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
`;
