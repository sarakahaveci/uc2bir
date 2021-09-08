import React from 'react';

import styled from 'styled-components/macro';
import { device } from 'utils';
import CloseIcon from '@material-ui/icons/Close';

const PreviewImageModal = ({ open, imgSrc, closeModal = () => {} }) => {
  return (
    <Root style={{ display: open ? 'flex' : 'none' }}>
      <>
        <MainContainer>
          <ContextContainer>
            <CloseIcon
              style={{ alignSelf: 'flex-end', cursor: 'pointer' }}
              onClick={closeModal}
            />
            <img style={{ width: '100%', height: '100%' }} src={imgSrc}></img>
          </ContextContainer>
        </MainContainer>
      </>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99999;
`;
const MainContainer = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        border-radius: 30px;
        background: white;
        .close-icon {
            align - self: flex-end;

        svg {
            cursor: pointer;
    }
  }
        @media ${device.sm} {
            width: 95vw;
        height: 95vh;
        overflow: scroll;
  }
        `;
const ContextContainer = styled.div`
        display: flex;
        flex-direction: column;
        width: 30vw;
        justify-content: center;
        align-items: center;
        padding: 10px 0px 10px;
        svg {
            margin - bottom: 15px;
  }
        @media ${device.sm} {
            padding: 20px 0;
        width: 80vw;
  }
        `;

export default PreviewImageModal;
