import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { Svg } from 'components';
import { device } from 'utils';
import { getStaticPage } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import { TextArea } from 'components/Confirmations/Common.styles';
import ReactHtmlParser from 'react-html-parser';
import { decode } from 'html-entities';
const CookiePolicyModal = ({ open, cancel = () => {} }) => {
  const dispatch = useDispatch();
  const staticPages = useSelector((state) => state.staticPages);

  useEffect(() => {
    dispatch(getStaticPage('cerez-politikasi'));
  }, []);

  return (
    <Root style={{ display: open ? 'flex' : 'none' }}>
      <MainContainer>
        <ContextContainer>
          <ConfirmationTitle
            dangerouslySetInnerHTML={{
              __html: staticPages?.data?.['cerez-politikasi']?.title,
            }}
          />
          <TextArea>
            {ReactHtmlParser(
              decode(staticPages?.data?.['cerez-politikasi']?.detail)
            )}
          </TextArea>
        </ContextContainer>
        <Close
          onClick={() => {
            cancel();
          }}
        >
          <Svg.CloseIcon />
        </Close>
      </MainContainer>
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
  background: white;
  position: relative;
  @media ${device.sm} {
    width: 95vw;
    height: 95vh;
    overflow: scroll;
  }
`;

const ContextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  justify-content: center;
  align-items: center;
  padding: 60px 110px 30px;
  svg {
    margin-bottom: 15px;
  }
  @media ${device.sm} {
    padding: 20px 0;
    width: 80vw;
  }
`;
const Close = styled.div`
  display: flex;
  height: 50px;
  width: 50px;
  position: absolute;
  top: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const ConfirmationTitle = styled.h5`
  margin-bottom: 10px;
`;

export default CookiePolicyModal;
