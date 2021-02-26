import React from 'react';
import PropTypes from 'prop-types';

//tabs
import Profile from './tabs/Profile';

const ProfileFormCollections = ({ tab }) => {
  switch (tab) {
    case 'profile':
      return <Profile />;

    default:
      return <></>;
  }
};

ProfileFormCollections.propTypes = {
  tab: PropTypes.string.isRequired,
};

export default ProfileFormCollections;
