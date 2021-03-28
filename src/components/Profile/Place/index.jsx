import React, { useState } from 'react';
import styled from 'styled-components/macro';

import SubTabs from 'components/SubTabs/SubTabs';
import SportFields from './SportFields';
import WorkPlaceList from './WorkPlaceList';

const subTabData = [
  {
    label: 'Spor Alanları',
    value: 1,
  },
  {
    label: 'Ev Park',
    value: 2,
  },
  {
    label: 'Online',
    value: 3,
  },
];

const Place = () => {
  const [content, setContent] = useState(<SportFields />);

  const handleContent = (id) => {
    let newContent;
    switch (id) {
      case 1:
        newContent = <SportFields />;
        break;
      case 2:
        newContent = <WorkPlaceList />;
        break;

      default:
        break;
    }
    setContent(newContent);
  };

  return (
    <div>
      <Description>
        Spor alanı ile ilgili detay / bilgi veren yazı alanı. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam.
      </Description>
      <SubTabs
        className="mt-3"
        data={subTabData}
        lineWidth="100%"
        onChange={(value) => handleContent(value)}
      />
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
