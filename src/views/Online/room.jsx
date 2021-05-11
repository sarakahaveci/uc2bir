import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from './participant';
import { Link,useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Room = ({ roomName, token }) => {
  const history = useHistory();
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
    }).catch(()=> {
      toast.error(
        'Ders saatiniz başlamadı veya bir hata oluştu',
        {
          position: 'bottom-right',
          autoClose: 3000,
        }
      );
      history.push('/myprofile/settings/reservation');
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
        <LogoutBtn>Çıkış Yap</LogoutBtn>
      </Link>
      <Row>
      <Col lg={9} style={{padding:'0px'}}>
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ''
        )}
      </Col>
      <Col lg={3} style={{padding:'0px'}}>{remoteParticipants}</Col>
      </Row>
    </Container>
  );

};

const Container = styled.div`
  position: relative;
  display: grid;
`;

// const LocalParticipant = styled.div`
//   text-align: center;
//   margin-bottom: 2em;
//
// `;
//
// const RemoteParticipants = styled.div`
//   grid-template-columns: 1fr 355px;
//   flex-wrap: nowrap;
//   justify-content: space-between;
// `;

// const H3 = styled.h3`
//   text-align: center;
//   padding-bottom: 0.5em;
//   font-weight: 300;
//   margin-bottom: 1em;
// `;

const LogoutBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  background: #333e5a;
  color: #fff;
  font-size: 16px;
  padding: 0.4em;
  border-radius: 6px;
  border: 1px solid transparent;
  z-index: 2;

  &:hover {
    filter: brightness(150%);
  }
`;

export default Room;
