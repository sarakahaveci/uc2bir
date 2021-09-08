import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const descriptionMap = {
    gym: t(
      'Didnt you see the gym where you want to do sports here? You can send a message to the instructor and ask if you can teach at your preferred gym.'
    ),
    online: t('You can take online video lessons from this instructor'),
    home_park: t(
      'Didnt see the place you want to do sports here? You can send a message to the instructor and ask if it is appropriate to teach at your preferred location'
    ),
  };
  const { userInfo } = useSelector((state) => state.userProfile.userInfo);

  const [description, setDescription] = useState(descriptionMap.gym);

  const [content, setContent] = useState(<SportFields userId={userId} />);

  const handleContent = (type) => {
    let newContent;
    let newDesc;
    switch (type) {
      case 'gym':
        newContent = <SportFields userId={userId} />;
        newDesc = descriptionMap.gym;
        break;
      case 'home_park':
        newContent = <WorkPlaceList isOnline={false} userId={userId} />;
        newDesc = descriptionMap.home_park;
        break;
      case 'online':
        newContent = <WorkPlaceList isOnline={true} userId={userId} />;
        newDesc = descriptionMap.online;
        break;

      default:
        break;
    }
    setContent(newContent);
    setDescription(newDesc);
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
      {description && <Description>{description}</Description>}
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
