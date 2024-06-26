import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Text, Svg } from 'components';
import { Link } from 'react-router-dom';
import { device } from 'utils';
import { useTranslation } from 'react-i18next';

const RejectModal = ({
  open,
  reject,
  cancel,
  headerText = '',
  descText = '',
  cancelLabel = '',
  rejectLabel = '',
  elm,
}) => {
  const { t } = useTranslation();

  const [selectedPage, setSelectedPage] = useState('start');
  const [rejectStatus, setRejectStatus] = useState(undefined);
  const situations = [
    { id: 1, text: t('Location is not suitable for me') },
    { id: 2, text: t('Im Not Satisfied With The System') },
    { id: 3, text: t('I Encountered a Situation Contrary to Social Rules') },
    { id: 4, text: t('Hours Arent Right For Me') },
    { id: 5, text: t('I dont want to specify reason') },
  ];
  let content;

  switch (selectedPage) {
    case 'start':
      content = (
        <MainContainer>
          <Svg.CloseIcon
            className="close-icon"
            onClick={() => {
              cancel();
            }}
          />
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
              marginTop="10px"
            >
              {headerText}
            </Text>

            <Text textAlign="center" fontSize="1rem" color="dark">
              {elm
                ? elm?.date +
                  ' Tarihinde saat ' +
                  elm?.hour +
                  ' için gelen rezervasyon talebiniz iptal edilecektir. '
                : descText}
            </Text>
          </ContextContainer>

          <div className="modal-footer">
            <StyledButton
              reject
              onClick={() => {
                setSelectedPage('second');
              }}
            >
              {rejectLabel}
            </StyledButton>
          </div>
          <div className="modal-footer">
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
            <Svg.CloseIcon
              className="close-icon"
              onClick={() => {
                setSelectedPage('start');
              }}
            />
            <TextContainer>
              <StyledText>
                {t('Please Select Your Rejection Reason')}
              </StyledText>
            </TextContainer>
            <ReasonContainer>
              {situations.map((item, indx) => (
                <Reason
                  selected={item?.id === rejectStatus}
                  onClick={() => setRejectStatus(item.id)}
                  key={indx}
                >
                  {item.text}
                </Reason>
              ))}
            </ReasonContainer>
          </ReasonContextContainer>

          <div className="modal-footer">
            <StyledButton
              onClick={() => {
                reject(open, rejectStatus);
              }}
            >
              {t('send')}
            </StyledButton>
          </div>
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
  border-radius: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: white;
  .close-icon {
    align-self: flex-end;

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
  color: ${(p) => (p.reject ? '#F01C62' : 'black')};
  text-align: center;
  display: block;
  width: 100%;
  text-transform: uppercase;
  &:hover {
    color: var(--blue);
  }
`;

const ContextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  justify-content: center;
  align-items: center;
  padding: 50px 70px 30px;

  @media ${device.sm} {
    padding: 20px 0;
    width: 80vw;
  }
`;
const ReasonContextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;

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
export default RejectModal;
