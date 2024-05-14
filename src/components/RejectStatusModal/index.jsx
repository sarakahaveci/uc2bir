import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Text, Svg } from 'components';
import { Link } from 'react-router-dom';
import { device } from 'utils';
import { Material } from 'components';
import { useTranslation } from 'react-i18next';


const RejectStatusModal = ({
  //appointmentAll,
  open,
  reject = () => { },
  cancel,

}) => {
  const { t } = useTranslation();

  const [selectedPage, setSelectedPage] = useState('start');
  // eslint-disable-next-line
  const [comment, setComment] = useState(undefined);

  useEffect(() => {
    if (!open) {
      setComment(undefined);

      setSelectedPage('start');
    }
  }, [open]);
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
            <Text
              variant="h2"
              fontSize="1.2rem"
              color="dark"
              fontWeight="500"
              textAlign="center"
              style={{ marginBottom: '25px' }}
            >
              Ders Gerçekleşmedi
            </Text>
            Dersin neden gerçekleşmediğini bildirirmisiniz ?

          </ContextContainer>

          <Material.TextField
            style={{ margin: '20px 0' }}
            label={t('Enter your comment...')}
            type="text"
            name="comment"
            changeValue={''}
            defaultValue={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <div style={{ display: 'flex' }}>

            <div className="modal-footer">
              <StyledButton
                rate
                onClick={() => {
                  reject(comment)
                }}
              >
                {t('ok')}
              </StyledButton>
            </div>
            <div className="modal-footer">
              <StyledButton
                onClick={() => {
                  cancel();
                }}
              >
                {t('cancel')}

              </StyledButton>
            </div>
          </div>
        </MainContainer>
      );
      break;

    default:
      break;
  }

  return (
    <Root style={{ display: open !== null ? 'flex' : 'none' }}>{content}</Root>
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
  overflow-y: scroll;
`;
const MainContainer = styled.div`
  display: flex;
  width: 75%;
  flex-direction: column;
  border-radius: 30px;
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
  width: 60%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${device.sm} {
    padding: 20px 0;
    width: 80vw;
  }
`;


export default RejectStatusModal;
