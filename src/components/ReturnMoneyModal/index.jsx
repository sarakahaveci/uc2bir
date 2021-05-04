import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Text, Svg, Button, Material } from 'components';
import { Link } from 'react-router-dom';
import { device } from 'utils';
const ReturnMoneyModal = ({ open, wallet = () => {}, card = () => {} }) => {
  const [page, setPage] = useState('main');
  useEffect(() => {
    if (!open) {
      setPage('main');
    }
  }, [open]);
  function CreditCard() {
    return (
      <>
        <InfoContainer>
          <DataContainer>
            <Data borderDisable>
              <Text style={{ fontWeight: 800 }}>Kart Bilgileri</Text>
            </Data>

            <Material.TextField
              label="Kart Üzerindeki İsim"
              type="text"
              name="holder_name"
              //defaultValue={reservation?.data?.holder_name}
              onBlur={() => {
                //dispatch(setReservation({ holder_name: e.target.value }));
              }}
            />

            <Material.TextField
              mask="9999 9999 9999 9999"
              label="Kart No Giriniz"
              type="text"
              name="card_number"
              //defaultValue={reservation?.data?.card_number}
              onBlur={() => {
                //dispatch(setReservation({ card_number: e.target.value }));
              }}
            />
            <Data borderDisable>
              <Material.TextField
                label="SKT"
                type="text"
                name="skt"
                mask="99/9999"
                // defaultValue={
                // reservation?.data?.expiration_month +
                // '/' +
                //reservation?.data?.expiration_year
                //  }
                /*onBlur={(e) => {
                  var sktArr = e.target.value.split('/');
                  dispatch(
                    setReservation({
                      expiration_month: sktArr[0],
                      expiration_year: sktArr[1],
                    })
                  );
                  }}*/
              />
              <Material.TextField
                mask="999"
                label="CVV"
                type="text"
                name="cvv"
                // defaultValue={reservation?.data?.cvc}
                /*onBlur={(e) => {
                  dispatch(setReservation({ cvc: e.target.value }));
                }}*/
              />
            </Data>
          </DataContainer>
          <div style={{ padding: '10px' }}>
            <text>
              Güvenliğiniz sebebi ile bu işleminiz 3D secure ile
              gerçekleştirilecektir.
            </text>
          </div>
          <div style={{ padding: '10px' }}>
            <Material.CheckBox
              //checked={reservation?.data?.is_contracts_accepted}
              /*onChange={() => {
                if (reservation?.data.is_contracts_accepted) {
                  dispatch(setReservation({ is_contracts_accepted: false }));
                } else {
                  setOpenModal(true);
                }
              }}*/
              label={
                <div>
                  <span className="underline-text" onClick={() => {}}>
                    Ön Bilgilendirme Koşulları’nı ve Mesafeli Satış Sözleşmesini
                    okudum, onaylıyorum.
                  </span>
                </div>
              }
            />
          </div>
          <Button
            className="blue mt-3"
            text="Onayla"
            fontWeight="500"
            onClick={() => {
              card(open);
            }}

            //disabled={!isAccepted || waitingPrice || isInitialForm}
          />
        </InfoContainer>
      </>
    );
  }

  let content;
  switch (page) {
    case 'main':
      content = (
        <>
          <MainContainer>
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
            <ContextContainer>
              <WalletContainer>
                <Header>Cüzdana Transfer</Header>
                <Info>
                  <Label>Bakiye</Label>
                  <ValueText>200</ValueText>
                </Info>
                <Info>
                  <Label>Aktarım Sonrası Bakiye</Label>
                  <ValueText>300</ValueText>
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
  background: white;
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
const Data = styled.div`
  display: flex;
  justify-content: space-between;
  border-style: ${(p) => (p.borderDisable ? 'none' : 'solid')};
  border-color: rgba(144, 144, 144, 0.5);
  border-width: 0 0 1px 0;
  padding: 10px 5px;
`;
const InfoContainer = styled.div`
  margin-top: 40px;
  width: 586px;
  background: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  @media ${device.sm} {
    width: 100%;
  }
`;
const DataContainer = styled.div`
  width: 100%;
  background: white;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #c6c6c6;
  padding: 5px 20px;
`;
export default ReturnMoneyModal;
