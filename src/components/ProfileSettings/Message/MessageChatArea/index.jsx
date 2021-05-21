import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { toast } from 'react-toastify';
import { ISOToTimeConverter } from 'utils';
import {
  getRoomMessages,
  sendMessageToRoom,
  getRooms,
  sendFileToRoom,
} from 'actions';
import MessageRow from './MessageRow';
import ChatBoxHeader from './ChatBoxHeader';
import DefaultProfileImg from 'assets/default-profile.jpg';
import { PlusButton } from 'components';
import { resizeFile } from 'utils';

export default function MessageArea() {
  // eslint-disable-next-line
  const [file, setFile] = useState();
  const [previewImg, setPreviewImg] = useState(null);
  const [message, setMessage] = useState(null);

  const fileInputRef = useRef();

  const { data: allMessages } = useSelector(
    (state) => state.profileSettings2.messages.messages
  );
  const { user } = useSelector((state) => state.auth);

  const { selectedRoomName, selectedRoomUser } = useSelector(
    (state) => state.profileSettings2.messages.selectedRoom
  );
  const { messageSideBarOpen } = useSelector(
    (state) => state.profileSettings2.messages
  );
  const [fileSendButtonsEnabled, setFileSendButtonsEnabled] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedRoomName) {
      dispatch(getRoomMessages(selectedRoomName));
    }
  }, [selectedRoomName]);

  const successMessageCallback = () => {
    setMessage('');
    dispatch(getRoomMessages(selectedRoomName));
    dispatch(getRooms());
    setFile();
    setPreviewImg(null);
    setFileSendButtonsEnabled(true)
  };

  const handleSubmitMessage = (event) => {
    if (event.key === 'Enter' && !!message) {
      dispatch(sendMessageToRoom(message, successMessageCallback));
    }
  };

  const handleSubmitPhoto = () => {
    setFileSendButtonsEnabled(false)
    dispatch(sendFileToRoom(file, successMessageCallback));
  };

  const handleCancelSubmitPhoto = () => {
    setFileSendButtonsEnabled(false)
    setPreviewImg(null);
  };



  const fileChangeHandler = async (e) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (allowedExtensions.exec(e.target.value)) {
      const resizedFile = await resizeFile(e.target.files[0]);
      setFile(resizedFile);
      setPreviewImg(URL.createObjectURL(e.target.files[0]))
    } else {
      toast.error('Yalnızca fotoğraf gönderebilirsiniz.');
    }
  };

  return (
    <div
      style={{
        display: messageSideBarOpen ? 'none' : 'initial',
      }}
      className="message-page__right"
    >
      <ChatBoxHeader />
      <div className="message-page__message__wrapper">
        {previewImg &&
          <StyledPreview>
            <img className="preview-img" src={previewImg} />

            {fileSendButtonsEnabled ?
              <StyledPreviewButtons>  <span onClick={() => { handleCancelSubmitPhoto() }} className="button-container left" >Vazgeç</span>
                <span onClick={() => { handleSubmitPhoto() }} className="button-container right" >Fotoğrafı Gönder</span>
              </StyledPreviewButtons>
              : <StyledPreviewButtons></StyledPreviewButtons>
            }
          </StyledPreview>
        }
        <div className="message-page__chat__row">
          {allMessages?.map((message, index) => {
            const time = ISOToTimeConverter(message.created_at);
            const photo =
              selectedRoomUser?.profile_image?.path || DefaultProfileImg;

            return (
              <MessageRow
                key={index}
                time={time}
                message={message?.message}
                isMyMessage={message?.sender_id === user?.id}
                senderProfileAvatar={photo}
                file={message?.file}
              />
            );
          })}
        </div>
        <InputWrapper>
          <input
            placeholder="Mesaj yaz"
            className="message-input w-100 mt-2"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={handleSubmitMessage}
          />

          <PlusButton
            className="plus-button"
            onClick={() => fileInputRef.current.click()}
          />
        </InputWrapper>

        <FileInput
          type="file"
          ref={fileInputRef}
          onChange={fileChangeHandler}
          accept="image/*"
        />
      </div>
    </div>
  );
}

const InputWrapper = styled.div`
  position: relative;

  .plus-button {
    position: absolute;
    right: 7px;
    bottom: 2px;
    width: 24px;
    height: 24px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const StyledPreview = styled.div`
border-top-right-radius:25px;
border-top-left-radius:25px;
border-bottom-left-radius:25px;
margin-bottom:40px;
zIndex:999;
position:absolute;
background-color:#00b2a9;
display:flex;
flex-direction:column;
width:96%;
height:47%;
align-items:center;
justify-content:center; 
.preview-img{ 
border-top-right-radius:25px;
border-top-left-radius:25px;
border-bottom-left-radius:25px;
width:auto;
max-width:80%;
height:90%;
margin-top:30px; 
}
`;

const StyledPreviewButtons = styled.div`
margin-bottom:30px;
width:100%;
justify-content:space-between;
display:flex;
min-height:0.9rem;
background-color:transparent; 
.button-container{
  width:100%;
  background-color:transparent;
  color:white;
  font-size:0.9rem;
  font-weight:600;    
  cursor:pointer; !important;
}
.left{
  margin-left:10%; 
  text-align:start;
}
.right{ 
  cursor:pointer; !important;
  margin-right:10%;
  text-align:end;
}
`;
