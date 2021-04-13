import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';

import SubTabs from 'components/SubTabs/SubTabs';
import ClinicPlaceIcon from 'assets/clinic-sesion.svg';

import OnlineWorkIcon from 'assets/online-work.svg';
import Clinic from './Clinic';

const iconMap = {
  clinic: ClinicPlaceIcon,
  online: OnlineWorkIcon,
};

const Place = ({ userId }) => {
  const { userInfo } = useSelector((state) => state.userProfile.userInfo);

  const [content, setContent] = useState(<Clinic userId={userId} />);

  const handleContent = (type) => {
    let newContent;
    switch (type) {
      case 'clinic':
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
        data={userInfo?.session}
        lineWidth="50%"
        onChange={(item) => handleContent(item.type)}
        customNode={(item) => (
          <>
            <img src={iconMap[item.type]} /> {item.title}
          </>
        )}
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
