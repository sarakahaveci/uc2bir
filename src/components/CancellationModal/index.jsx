import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Text, Svg } from 'components';
import { Link } from 'react-router-dom';
import { device } from 'utils';
const CancalletionModal = ({
  open,
  cancelStepOne,
  stepTwoData,
  cancelStepTwo,
  cancelProcess,
  headerText = '',
  descText = '',
  cancelProcessLabel = '',
  cancelLabel = '',
}) => {
  const [selectedPage, setSelectedPage] = useState('start');

  let content;
  useEffect(() => {
    setSelectedPage('start');
  }, [open]);
  switch (selectedPage) {
    case 'start':
      content = (
        <MainContainer>
          <ContextContainer>
            <IconContainer>
              <Svg.Reject />
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
              cancel
              onClick={() => {
                cancelStepOne(open);
                setSelectedPage('second');
              }}
            >
              {cancelLabel}
            </StyledButton>
          </div>
          <div className="modal-footer" closeIcon={false}>
            <StyledButton
              onClick={() => {
                cancelProcess();
              }}
            >
              {cancelProcessLabel}
            </StyledButton>
          </div>
        </MainContainer>
      );
      break;
    case 'second':
      content = (
        <MainContainer>
          <ContextContainer>
            <IconContainer>
              <Svg.Reject />
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
              {stepTwoData?.remaining_hour}
            </Text>
          </ContextContainer>

          <StyledButton
            onClick={() => {
              cancelStepTwo(open);
            }}
          >
            GÖNDER
          </StyledButton>
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
  background: #f01c62;
`;
const StyledButton = styled(Link)`
  font-size: 1.2rem;
  color: ${(p) => (p.cancel ? '#F01C62' : 'black')};
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

  @media ${device.sm} {
    padding: 20px 0;
    width: 90vw;
    overflow: scroll;
  }
`;
const ReasonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 20px;
`;
const Reason = styled.text`
  border-style: solid;
  border-width: 1px;
  border-color: var(--blue);
  border-radius: 15px;
  padding: 10px;
  margin: 5px;
  background: ${(p) => (p.selected ? 'var(--blue)' : 'white')};
  color: ${(p) => (p.selected ? 'white' : 'black')};
`;
const TextContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
const StyledText = styled.text`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
`;
export default CancalletionModal;
