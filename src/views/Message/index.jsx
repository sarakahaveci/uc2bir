// @ts-nocheck
import React from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import Main from 'components/Main';
import Message from 'components/ProfileSettings/Message';

const Info = ({ match }) => {
  return (
    <Main>
      <div style={{ marginTop: '20px' }} className="basic-info">
        <Container>
          <Message id={match?.params?.id} />
        </Container>
      </div>
    </Main>
  );
};
const Container = styled.div`
  padding: 30px;
  @media ${device.sm} {
    padding: 0;
  }
`;
export default Info;
