import React from 'react';

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
      {mockData.map((data, index) => (
        <WorkPlaceRow key={index} {...data} />
      ))}
    </div>
  );
};

export default SportFields;
