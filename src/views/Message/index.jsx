// @ts-nocheck
import React from 'react';
import { Container } from 'react-bootstrap';

import Main from 'components/Main';
import Message from 'components/ProfileSettings/Message';

const Info = () => {
  return (
    <Main>
      <div style={{ marginTop: '20px' }} className="basic-info">
        <Container className="message-content">
          <Message />
        </Container>
      </div>
    </Main>
  );
};

export default Info;
