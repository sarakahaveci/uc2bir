import React, { useState, useEffect,useRef } from 'react';
import Video from 'twilio-video';
import Participant from './participant';
import { Link,useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Svg, Text } from '../../components';
import { useSelector } from 'react-redux';
import { USER_KEYS } from '../../constants';

const Room = ({ roomName, token }) => {
  const history = useHistory();
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const { userDetail:userDetail } = useSelector(
    (state) => state.professionalReservation.reservationDetail
  );
  const { type_id: userTypeId } = useSelector(
    (state) => state.auth.user
  );
  const [timer, setTimer] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const countRef = useRef(null)

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)

    return `${getMinutes} : ${getSeconds}`
  }

  const handleStart = () => {
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  useEffect(()=>{handleStart()},[])

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
      <LocalParticipant >
        {remoteParticipants}
      </LocalParticipant>
      <RemoteParticipants > {room ? (
        <Participant
          key={room.localParticipant.sid}
          participant={room.localParticipant}
        />
      ) : (
        ''
      )}</RemoteParticipants>

      <BannerContainer>
        <Row >
        <Col lg={5}>
          <Text color="white" fontWeight="500" fontSize="1.5rem" ml={'10px'}>
            {userDetail[USER_KEYS[userTypeId]]?.name}
          </Text>
        </Col>
        <Col lg={3} >
          <Row style={{display:'flex', justifyContent:'center'}}>
          <TimerContainer>
            <Text color="dark" >
              {formatTime()}
            </Text>
          </TimerContainer>
          </Row>
        </Col>

        <Col lg={3} />

        <Col lg={1}>
          <RowAudio>
            {isMuted? <MicMuted onClick={()=> {
              room.localParticipant.audioTracks.forEach(function(trackPublication) {
                trackPublication.track.enable();
              });
              setIsMuted(!isMuted);
            }}/> :  <Mic onClick={()=> {
              setIsMuted(!isMuted);
              room.localParticipant.audioTracks.forEach(function(trackPublication) {
                trackPublication.track.disable();
              });
            }}/>}
            {isVideoOff? <VideoQuiet onClick={()=> {
              room.localParticipant.videoTracks.forEach(function(trackPublication) {
                trackPublication.track.enable();
              });
              setIsVideoOff(!isVideoOff);
            }}/> :  <VideoIcon onClick={()=> {
              room.localParticipant.videoTracks.forEach(function(trackPublication) {
                trackPublication.track.disable();
              });
              setIsVideoOff(!isVideoOff);
            }}/>}
            <Link to={'/myprofile/settings/reservation'}>
              <PhoneMissed/>
            </Link>

          </RowAudio>
        </Col>
        </Row>
      </BannerContainer>
    </Container>
  );

};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const RowAudio = styled(Row)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-right: 20px;
`;

const Mic = styled(Svg.Mic)`
  svg {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
`;

const MicMuted = styled(Svg.MicQuiet)`
  svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;

const VideoQuiet = styled(Svg.VideoQuiet)`
  svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;

const PhoneMissed = styled(Svg.PhoneMissed)`
  svg {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
`;

const VideoIcon = styled(Svg.Video)`
  svg {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
`;

const LocalParticipant = styled.div`
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
`;

const TimerContainer = styled.div`
  text-align: center;
  width: 80px;
  height: 30px;
  margin-top: 20px;
  background-color: #FFFFFF;
  border-radius: 10px;
`;

const BannerContainer = styled.div`
  width: 100%;
  height: 80px;
  z-index: 2;
  position: absolute;
  background-color: #303030;
  bottom: 0;
  
`;

const RemoteParticipants = styled.div`
  width: 350px;
  height: 262px;
  z-index: 2;
  position: absolute;
  right: 1px;
  bottom: 105px;
  border: 1px solid #00B2A9;
`;

export default Room;
