import React, { useState } from 'react';
import styled from 'styled-components/macro';

import SubTabs from 'components/SubTabs/SubTabs';
import ClinicPlaceIcon from 'assets/clinic-sesion.svg';

import OnlineWorkIcon from 'assets/online-work.svg';
import Clinic from './Clinic';

const subTabData = [
  {
    label: 'Klinik',
    value: 1,
    icon: ClinicPlaceIcon,
  },
  {
    label: 'Online',
    value: 2,
    icon: OnlineWorkIcon,
  },
];

const Place = ({ userId }) => {
  const [content, setContent] = useState(<Clinic userId={userId} />);

  const handleContent = (id) => {
    let newContent;
    switch (id) {
      case 1:
        newContent = <Clinic userId={userId} />;
        break;

      default:
        break;
    }
    setContent(newContent);
  };

  return (
    <div>
      <SubTabs
        className="mt-3"
        data={subTabData}
        lineWidth="100%"
        onChange={(value) => handleContent(value)}
      />

      <Description>
        Spor alanı ile ilgili detay / bilgi veren yazı alanı. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam.
      </Description>

      {content}
    </div>
  );
};

const Description = styled.div`
  font-size: 0.9rem;
  text-align: left;
  color: ${(p) => p.theme.colors.dark};
  padding: 20px 10px;
  border-radius: 10px;
  background: ${(p) => p.theme.colors.white3};
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.16);
`;

export default Place;
