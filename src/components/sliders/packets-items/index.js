/* eslint-disable react/display-name */
import React from 'react';

import Packet from './Packet';
import GroupLesson from './GroupLesson';

export default {
  Packet: (props) => <Packet {...props} />,
  GroupLesson: (props) => <GroupLesson {...props} />,
};
