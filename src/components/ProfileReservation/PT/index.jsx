import React, { useState } from 'react';
import Home from './Home';
const PT = () => {
  const [SubPage] = useState('Home');

  switch (SubPage) {
    case 'Home':
      return <Home />;

    case 'Adds':
      return <div></div>;

    default:
      return <></>;
  }
};

export default PT;
