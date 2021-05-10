import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Main, Spinner } from '../../components';
import Room from './room';
import { generateTwilioToken } from '../../actions';


const Online = () => {
  // const [username, setUsername] = useState('');
  // const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);
  const tokenData = useSelector((state) => state.online.token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(generateTwilioToken())
  }, []);

  useEffect(() => {
    setToken(tokenData?.token);
  }, [tokenData]);

  // const handleUsernameChange = useCallback(event => {
  //   setUsername(event.target.value);
  // }, []);
  //
  // const handleRoomNameChange = useCallback(event => {
  //   setRoomName(event.target.value);
  // }, []);
  //
  //
  //
  // const handleSubmit = useCallback(async event => {
  //   event.preventDefault();
  //
  //   setToken(tokenData?.token);
  // }, [username, roomName]);

  const handleLogout = useCallback(event => {
    event.preventDefault();
    setToken(null);
  }, []);


  let render;
  if (token) {
    render = (
      <Main>
        <Room roomName={tokenData?.reservation_id} token={token} handleLogout={handleLogout} />
      </Main>
    );
  } else {
    render = (
      <Main>
        <Spinner />
      </Main>
    );
  }
  return render;

};

export default Online;

