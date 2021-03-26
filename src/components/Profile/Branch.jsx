import React from 'react';
import styled from 'styled-components/macro';

import { Accordion, Box } from 'components';
import BranchCardHeader from '../BranchRow/BranchRowToggler';
import BranchCardBody from '../BranchRow/BranchRowCollapser';

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
    sportName: 'PİLATES',
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
        {mockData.map((item, index) => {
          return (
            <StyledRow key={index}>
              <Order>{index + 1}.</Order>

              <AccordionItem>
                <Accordion.Item>
                  <Accordion.Toggle>
                    <BranchCardHeader data={item} />
                  </Accordion.Toggle>

                  <Accordion.Collapse>
                    <BranchCardBody speciality={item.speciality} />
                  </Accordion.Collapse>
                </Accordion.Item>
              </AccordionItem>
            </StyledRow>
          );
        })}
      </Accordion>
    </div>
  );
};

export default UserDetails;

const StyledRow = styled(Box)`
  display: flex;

  &:not(:first-child) {
    margin-top: 30px;
  }
`;

const AccordionItem = styled.div`
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  flex: 1;
`;

const Order = styled.span`
  font-weight: 600;
  color: ${(p) => p.theme.colors.white2};
  margin: 15px 10px 0 0;
`;
