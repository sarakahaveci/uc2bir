import React from 'react';
import styled from 'styled-components/macro';

import ChatBox from './ChatBox';

export default function MessageRow({
  setPreviewImg,
  setPreviewImageModalOpen,
  time = '20:10',
  isMyMessage = false,
  message,
  senderProfileAvatar,
  file,
}) {
  const wrapperClass = isMyMessage
    ? 'message-row__wrapper__home'
    : 'message-row__wrapper__away';

  const timeAlignClass = isMyMessage ? 'right' : 'left';

  return (
    <div className={wrapperClass}>
      {!isMyMessage && <Avatar src={senderProfileAvatar} alt="" />}
      <div>
        <ChatBox isMyMessage={isMyMessage} message={message} file={file}
          setPreviewImg={setPreviewImg}
          setPreviewImageModalOpen={setPreviewImageModalOpen}
        />
        <Time textAlign={timeAlignClass}>
          <span className="time-text">{time}</span>
        </Time>
      </div>
    </div>
  );
}

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: contain;
`;
const Time = styled.div`
display:flex;
.time-text{
  width:100%;
  font-size:0.8rem;
  font-weight:400;
  color:#909090;
  text-align: ${(props) => props.textAlign};
}
`;