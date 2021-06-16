import React, { useState } from 'react';
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

      {content}
    </div>
  );
};



export default Place;
