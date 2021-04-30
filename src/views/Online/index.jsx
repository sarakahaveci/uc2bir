import React, {useCallback, useState } from 'react';

import { Main } from '../../components';
import Lobby from './lobby';
import Room from './room';


const Online = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);



  const handleSubmit = useCallback(async event => {
    event.preventDefault();
    // const data = await fetch('/video/token', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     identity: username,
    //     room: roomName
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(res => res.json());
    setToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2M5OTYwZDJkZmNjMWNiZWU3ODFiNjBlZWFiMjcwNWQ1LTE2MTk3ODAxODIiLCJpc3MiOiJTS2M5OTYwZDJkZmNjMWNiZWU3ODFiNjBlZWFiMjcwNWQ1Iiwic3ViIjoiQUNiNWQxZjIwMjBjMjU2N2E5NDgxZmMyNDIzNzdiMzdiNSIsImV4cCI6MTYxOTc4Mzc4MiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoibXVzdGFmYSIsInZpZGVvIjp7InJvb20iOiIxIn19fQ.bPdH2LjZfG3nouzcq-9zfo27ruwrkRwBKMK28iyxW-E');
  }, [username, roomName]);

  const handleLogout = useCallback(event => {
    event.preventDefault();
    setToken(null);
  }, []);


  let render;
  if (token) {
    render = (
      <Main>
        <Room roomName={roomName} token={token} handleLogout={handleLogout} />
      </Main>
    );
  } else {
    render = (
      <Main >
        <Lobby
          username={username}
          roomName={roomName}
          handleUsernameChange={handleUsernameChange}
          handleRoomNameChange={handleRoomNameChange}
          handleSubmit={handleSubmit}
        />
      </Main>
    );
  }
  return render;

  // return (
  //   <Main>
  //
  //     <ConfirmationTitle
  //       dangerouslySetInnerHTML={{
  //         __html: staticPages?.data?.['kvkk-sozlesmesi']?.title,
  //       }}
  //     />
  //   </Main>
  // );
};

export default Online;

