import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from './participant';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

const Room = ({ roomName, token }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };
    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };
    Video.connect(token, {
      name: roomName
    }).then(room => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function(trackPublication) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  },[roomName, token]);

  return (
    <Container >
      <Link to={'/myprofile/settings/reservation'}>
        <LogoutBtn>Log out</LogoutBtn>
      </Link>
      <LocalParticipant >
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ''
        )}
      </LocalParticipant>
      <H3>Remote Participants</H3>
      <RemoteParticipants >{remoteParticipants}</RemoteParticipants>
    </Container>
  );

};

const Container = styled.div`
  position: relative;
`;

const LocalParticipant = styled.div`
  text-align: center;
  margin-bottom: 2em;
`;

const RemoteParticipants = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 0 2em 2em;
`;

const H3 = styled.h3`
  text-align: center;
  padding-bottom: 0.5em;
  font-weight: 300;
  margin-bottom: 1em;
`;

const LogoutBtn = styled.button`
  position: absolute;
  top: 0;
  right: 20px;
  background: #333e5a;
  color: #fff;
  font-size: 16px;
  padding: 0.4em;
  border-radius: 6px;
  border: 1px solid transparent;

  &:hover {
    filter: brightness(150%);
  }
`;

export default Room;
