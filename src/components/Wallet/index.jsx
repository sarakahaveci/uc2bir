import React, { useState } from 'react';

import Home from './Home';
import Activities from './Activities';
import Transfer from './Transfer';
import UserTransfer from './UserTransfer';
import TransferInfo from './TransferInfo';

const Wallet = () => {
  const [page, setPage] = useState('home');
  switch (page) {
    case 'home':
      return <Home setPage={setPage} />;
    case 'activities':
      return <Activities setPage={setPage} />;
    case 'transfer':
      return <Transfer setPage={setPage} />;
    case 'TransferInfo':
      return <TransferInfo setPage={setPage} />;
    case 'UserTransfer':
      return <UserTransfer setPage={setPage} />;
    default:
      break;
  }
  return <></>;
};

export default Wallet;
