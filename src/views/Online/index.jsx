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
  const [detailData, setDetailData] = useState({});
  const user = useSelector((state) => state.auth.user);
  const professionalReservation = useSelector(
    (state) => state.professionalReservation
  );

  useEffect(() => {
    switch (user?.type_id) {
      case 2:
        setDetailData(professionalReservation?.ptReservation?.res_detail);
        break;
      case 4:
        setDetailData(professionalReservation?.dtReservation?.res_detail);
        break;
      case 1:
        setDetailData(professionalReservation?.userReservation?.res_detail);
        break;
      default:
        break;
    }
  }, [professionalReservation,user]);

  const dispatch = useDispatch();

  useEffect(() => {
    if(detailData?.id){
      dispatch(generateTwilioToken(detailData?.id))
    }
  }, [detailData]);

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
      <>
        <Room roomName={tokenData?.reservation_id} token={token} handleLogout={handleLogout} />
      </>
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

