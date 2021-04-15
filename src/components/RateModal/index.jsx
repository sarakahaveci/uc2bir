import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Text, Svg } from 'components';
import { Link } from 'react-router-dom';
import { device } from 'utils';
import { Material } from 'components';
const RateModal = ({
  open,
  rate,
  cancel,
  headerText = '',
  descText = '',
  cancelLabel = '',
  rateLabel = '',
}) => {
  const [selectedPage, setSelectedPage] = useState('start');
  let content;

  switch (selectedPage) {
    case 'start':
      content = (
        <MainContainer>
          <ContextContainer>
            <IconContainer>
              <Svg.Approve />
            </IconContainer>

            <Text
              variant="h2"
              fontSize="1.2rem"
              color="dark"
              fontWeight="500"
              textAlign="center"
            >
              {headerText}
            </Text>

            <Text textAlign="center" fontSize="1rem" color="dark">
              {descText}
            </Text>
          </ContextContainer>

          <div className="modal-footer" closeIcon={false}>
            <StyledButton
              rate
              onClick={() => {
                setSelectedPage('second');
              }}
            >
              {rateLabel}
            </StyledButton>
          </div>
          <div className="modal-footer" closeIcon={false}>
            <StyledButton
              onClick={() => {
                cancel();
              }}
            >
              {cancelLabel}
            </StyledButton>
          </div>
        </MainContainer>
      );
      break;
    case 'second':
      content = (
        <MainContainer>
          <ReasonContextContainer>
            <TextContainer>
              <StyledText>Puan & Yorum</StyledText>
            </TextContainer>
            <StarContainer>Yıldız Veriniz :</StarContainer>
            <Material.TextField
              style={{ margin: '20px 0' }}
              label="Yorumnuzu giriniz..."
              type="text"
              name="comment"
            />
          </ReasonContextContainer>

          <ModalFooter>
            <FooterButton
              onClick={() => {
                cancel();
              }}
            >
              VAZGEÇ
            </FooterButton>
            <FooterButton
              rate
              onClick={() => {
                rate();
              }}
            >
              GÖNDER
            </FooterButton>
          </ModalFooter>
        </MainContainer>
      );
      break;
    default:
      break;
  }

  return <Root style={{ display: open ? 'flex' : 'none' }}>{content}</Root>;
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
  @media ${device.sm} {
    width: 95vw;
    height: 95vh;
    overflow: scroll;
  }
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 200px;
  background: var(--blue);
`;
const StyledButton = styled(Link)`
  font-size: 1.2rem;
  color: ${(p) => (p.rate ? 'var(--blue)' : 'black')};
  text-align: center;
  display: block;
  width: 100%;

  &:hover {
    color: var(--blue);
  }
`;

const ContextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  justify-content: center;
  align-items: center;
  padding: 60px 110px 30px;

  @media ${device.sm} {
    padding: 20px 0;
    width: 80vw;
  }
`;
const ReasonContextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  padding: 30px;
  @media ${device.sm} {
    width: 90vw;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
const StyledText = styled.text`
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  color: var(--blue);
`;
const ModalFooter = styled.div`
  display: flex;
  width: 100%;
`;
const FooterButton = styled.button`
  font-size: 1.2rem;
  color: ${(p) => (p.rate ? 'white' : 'black')};
  text-align: center;
  display: block;
  width: 50%;
  background: ${(p) => (p.rate ? 'var(--blue)' : 'white')};
  padding: 10px;
`;
const StarContainer = styled.div`
  display: flex;
`;
export default RateModal;
