import React from 'react';
import PropTypes from 'prop-types';

//tabs
import Profile from './tabs/Profile';
import Password from './tabs/Password';

const ProfileFormCollections = ({ tab }) => {
  switch (tab) {
    case 'profile':
      return <Profile />;

    case 'password':
      return <Password />;

    default:
      return <></>;
  }
};

ProfileFormCollections.propTypes = {
  tab: PropTypes.string.isRequired,
};

export default ProfileFormCollections;
