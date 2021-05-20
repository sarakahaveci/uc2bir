import React from 'react';
import styled from 'styled-components/macro'; 

export default function ChatBox({ message, isMyMessage, file }) {
  const boxWrapperClass = isMyMessage
    ? 'message-box__wrapper__home'
    : 'message-box__wrapper__away';

  const messageColorClass = isMyMessage ? 'white' : 'softDark';

  return (
    <div className={boxWrapperClass}>
      {file === 0 ? (
        <StyledTitle color={messageColorClass}>
          <span className="text">{message}</span>
        </StyledTitle> 
      ) : (
        <img style={{objectFit:"cover"}} src={message} width="200px" height="200px" />
      )}
    </div>
  );
}

const StyledTitle = styled.div` 
.text{
  width:100%;
  font-size:14px;
  font-weight:400; 
  color: ${(props) => props.color};
}
`;
