import React, { useState } from 'react';

import Home from './Home';
import Activities from './Activities';
import Transfer from './Transfer';
import UserTransfer from './UserTransfer';
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import TransferInfo from './TransferInfo';
import { USER } from '../../constants'
const Wallet = () => {
  const user = useSelector((state) => state.auth.user);
  const [page, setPage] = useState('');
  useEffect(() => {
    if (user?.type_id == USER) {
      setPage('activities')
    } else {
      setPage('home')
    }
  }, [user?.type_id])
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
      return <></>;
  }
  return <></>;
};

export default Wallet;
