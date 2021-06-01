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
const descriptionMap = {
  gym: "Spor yapmak istediğin salonu burada göremedin mi? Eğitmene mesaj göndererek tercih ettiğin spor salonunda ders verip veremeyeceğini sorabilirsin.",
  online: "Spor yapmak istediğin yeri kendin belirlerim diyorsan..", // dummy 
  home_park: "Spor yapmak istediğin yeri burada göremedin mi? Eğitmene mesaj göndererek tercih ettiğin yerde ders vermenin uygun olup olmadığını sorabilirsin. ",
};

const Place = ({ userId }) => {
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
        newContent = <WorkPlaceList userId={userId} />;
        newDesc = descriptionMap.home_park;
        break; 
      case 'online':
        newContent = <WorkPlaceList userId={userId} />;
        newDesc = null; 
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
      {description && <Description>
        {description}
      </Description>}
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
