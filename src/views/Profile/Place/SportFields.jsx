import React from 'react';
import styled from 'styled-components/macro';

import { WorkPlaceRow } from 'components';

const mockData = [
  {
    title: 'B-Fit Studio',
    price: 150,
    area: '180 m , 100 kişi kapasiteli',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    address: 'Cevdet Paşa Caddesi No: 52-54 Bebek - İstanbul',
  },
  {
    title: 'B-Fit Studio',
    price: 150,
    area: '180 m , 100 kişi kapasiteli',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    address: 'Cevdet Paşa Caddesi No: 52-54 Bebek - İstanbul',
  },
];

const SportFields = () => {
  return (
    <div>
      <Description>
        Spor alanı ile ilgili detay / bilgi veren yazı alanı. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam.
      </Description>

      {mockData.map((data) => (
        <WorkPlaceRow {...data} />
      ))}
    </div>
  );
};

export default SportFields;

const Description = styled.div`
  font-size: 0.9rem;
  text-align: left;
  color: ${(p) => p.theme.colors.dark};
  padding: 20px 10px;
  border-radius: 10px;
  background: ${(p) => p.theme.colors.white3};
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.16);
`;
