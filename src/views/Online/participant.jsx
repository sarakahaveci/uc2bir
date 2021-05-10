import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';

const Participant = ({ participant }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = trackMap => Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);

  useEffect(() => {
    const trackSubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => [...videoTracks, track]);
      } else {
        setAudioTracks(audioTracks => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
      } else {
        setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
      }
    };

    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <ParticipantContainer>
      <Video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} />
    </ParticipantContainer>
  );
};

const Video = styled.video`
    
    transform: scaleX(-1);
    width: 100%;
    max-width: 600px;
    display: block;
    margin: 0 auto;
    border-radius: 6px;
    //width: 100%;
    //position: relative;
    //display: flex;
    //height: 700px;
    //#video_container {
    //  position: relative;
    //}
    //
    //.videos {
    //  display: flex;
    //}
    //
    //#video_container video {
    //  max-width: 100%;
    //}
`;

const ParticipantContainer = styled.div`
  background: #333e5a;
  padding: 10px;
  border-radius: 6px;
  display: inline-block;
  margin-right: 10px;
`;
export default Participant;
