import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';

import SubTabs from 'components/SubTabs/SubTabs';
import WorkPlaceIcon from 'assets/work-place.svg';
import HomeParkIcon from 'assets/home-park.svg';
import OnlineWorkIcon from 'assets/online-work.svg';
import SportFields from './SportFields';
import WorkPlaceList from './WorkPlaceList';

const iconMap = {
  gym: WorkPlaceIcon,
  online: OnlineWorkIcon,
  home_park: HomeParkIcon,
};

const Place = ({ userId }) => {
  const { userInfo } = useSelector((state) => state.userProfile.userInfo);

  const [content, setContent] = useState(<SportFields userId={userId} />);

  const handleContent = (type) => {
    let newContent;
    switch (type) {
      case 'gym':
        newContent = <SportFields userId={userId} />;
        break;
      case 'home_park':
        newContent = <WorkPlaceList userId={userId} />;
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
        data={userInfo?.session}
        lineWidth="50%"
        onChange={(item) => handleContent(item.type)}
        customNode={(item) => (
          <>
            <img src={iconMap[item.type]} /> {item.title}
          </>
        )}
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
