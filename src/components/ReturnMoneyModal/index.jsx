import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components/macro';
import { Text, Svg, Button } from 'components';
import { Link } from 'react-router-dom';
import { device } from 'utils';
import CloseIcon from '@material-ui/icons/Close';
import { getWallet } from 'actions/userProfileActions/walletActions';

const ReturnMoneyModal = ({
  open,
  wallet = () => {},
  card = () => {},
  closeModal = () => {},
}) => {
  const balance = useSelector((state) => state?.userProfile?.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWallet());
  }, []);

  const [page, setPage] = useState('main');
  useEffect(() => {
    if (!open) {
      setPage('main');
    }
  }, [open]);
  function CreditCard() {
    return (
      <>
        <MainContainer>
          <CloseIcon
            style={{ alignSelf: 'flex-end', cursor: 'pointer' }}
            onClick={closeModal}
          />
          <ContextContainer>
            <Svg.SuccessIcon />
            <Text
              variant="h2"
              fontSize="1.2rem"
              color="dark"
              fontWeight="500"
              textAlign="center"
            >
              Rezervasyon için ödediğiniz tutar AYNI kredi kartınıza tekrar
              yatırılacaktır.Onaylıyor musunuz?
            </Text>
          </ContextContainer>
          <Button
            className="blue mt-3"
            text="Onayla"
            fontWeight="500"
            onClick={() => {
              card(open);
            }}
            //disabled={!isAccepted || waitingPrice || isInitialForm}
          />
        </MainContainer>
      </>
    );
  }

  let content;
  switch (page) {
    case 'main':
      content = (
        <>
          <MainContainer>
            <CloseIcon
              style={{ alignSelf: 'flex-end', cursor: 'pointer' }}
              onClick={closeModal}
            />
            <ContextContainer>
              <Svg.SuccessIcon />
              <Text
                variant="h2"
                fontSize="1.2rem"
                color="dark"
                fontWeight="500"
                textAlign="center"
              >
                Para iadesini ne şekilde yapalım ?
              </Text>

              <Text textAlign="center" fontSize="1rem" color="dark">
                İsterseniz tekrar hızlı bir şekilde kullanabilmek için cüzdana ,
                istersenizde kart hesabınıza aktarabiliriz.
              </Text>
            </ContextContainer>
            <div className="modal-footer" closeIcon={false}>
              <StyledButton
                approve
                onClick={() => {
                  setPage('wallet');
                }}
              >
                Cüzdan'a Transfer
              </StyledButton>
            </div>
            <div className="modal-footer" closeIcon={false}>
              <StyledButton
                approve
                onClick={() => {
                  setPage('card');
                }}
              >
                Karta Transfer
              </StyledButton>
            </div>
          </MainContainer>
        </>
      );

      break;

    case 'wallet':
      content = (
        <>
          <MainContainer>
            <CloseIcon
              style={{ alignSelf: 'flex-end', cursor: 'pointer' }}
              onClick={closeModal}
            />
            <ContextContainer>
              <WalletContainer>
                <Header>Cüzdana Transfer</Header>
                <Info>
                  <Label>Bakiye</Label>
                  <ValueText>{balance?.data?.balance}₺</ValueText>
                </Info>
                <Info>
                  <Label>Aktarım Sonrası Bakiye</Label>
                  {/* Bakiye + Bireysel Üyenin Satın Aldığı Hizmet Bedeli */}
                  <ValueText>+</ValueText>
                </Info>
                <Button
                  className="blue mt-3"
                  text="Onayla"
                  fontWeight="500"
                  onClick={() => {
                    wallet(open);
                  }}
                  //disabled={!isAccepted || waitingPrice || isInitialForm}
                />
              </WalletContainer>
            </ContextContainer>
          </MainContainer>
        </>
      );
      break;

    case 'card':
      content = (
        <>
          <MainContainer>
            <ContextContainer>
              <CreditCard />
            </ContextContainer>
          </MainContainer>
        </>
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
  border-radius: 30px;
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
  color: ${(p) => (p.approve ? 'var(--blue)' : 'black')};
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
  width: 30vw;
  justify-content: center;
  align-items: center;
  padding: 50px 70px 30px;
  svg {
    margin-bottom: 15px;
  }
  @media ${device.sm} {
    padding: 20px 0;
    width: 80vw;
  }
`;

const WalletContainer = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0px;
`;
const Label = styled.text`
  font-weight: bold;
  font-size: 18px;
`;
const Header = styled.text`
  font-weight: bold;
  font-size: 20px;
  margin: 10px 0px;
`;
const ValueText = styled.text`
  font-weight: bold;
  font-size: 18px;
  color: var(--blue);
`;
// const Data = styled.div`
//   display: flex;
//   justify-content: space-between;
//   border-style: ${(p) => (p.borderDisable ? 'none' : 'solid')};
//   border-color: rgba(144, 144, 144, 0.5);
//   border-width: 0 0 1px 0;
//   padding: 10px 5px;
// `;
// const InfoContainer = styled.div`
//   margin-top: 40px;
//   width: 586px;
//   background: #f8f8f8;
//   padding: 20px;
//   border-radius: 10px;
//   @media ${device.sm} {
//     width: 100%;
//   }
// `;
// const DataContainer = styled.div`
//   width: 100%;
//   background: white;
//   border-radius: 10px;
//   border-style: solid;
//   border-width: 1px;
//   border-color: #c6c6c6;
//   padding: 5px 20px;
// `;
export default ReturnMoneyModal;
