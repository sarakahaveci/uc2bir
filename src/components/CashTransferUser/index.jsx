import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { Material } from 'components';
import { getStaticPage } from 'actions';
import { Modal } from 'react-bootstrap';
import MultiContractWallet from '../Confirmations/MultiContractWallet';
import { useTranslation } from 'react-i18next';

const CashTransferUser = ({
  setCardName,
  setCardNo,
  setSktMM,
  setSktYY,
  setCVV,
  defaultCardName,
  defaultCardNo,
  defaultSKT,
  defaultCVV,
  setAmount,
}) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  // const reservation = useSelector((state) => state.reservation);
  const [openModal, setOpenModal] = useState(false);
  const [accept, setAccept] = useState(false);
  const staticPages = useSelector((state) => state.staticPages);

  useEffect(() => {
    dispatch(getStaticPage('uye-mesafeli-hizmet-sozlesmesi'));
    dispatch(getStaticPage('uye-on-bilgilendirme-formu'));
  }, []);

  return (
    <>
      <InfoContainer>
        <DataContainer>
          <Info borderDisable>
            <Text style={{ fontWeight: 800 }}>{t('Card Information')}</Text>
          </Info>

          <Material.TextField
            label={t('name on the card')}
            type="text"
            name="holder_name"
            defaultValue={defaultCardName}
            onBlur={(e) => {
              setCardName(e.target.value);
              //dispatch(setReservation({ holder_name: e.target.value }));
            }}
          />

          <Material.TextField
            mask="9999 9999 9999 9999"
            label={t('Enter Card Number')}
            type="text"
            name="card_number"
            defaultValue={defaultCardNo} /*reservation?.data?.card_number*/
            onBlur={(e) => {
              setCardNo(e.target.value.replace(/ /g, ''));
              //dispatch(setReservation({ card_number: e.target.value }));
            }}
          />
          <Info borderDisable>
            <Material.TextField
              label={t('EXP')}
              type="text"
              name="skt"
              mask="99/99"
              defaultValue={
                defaultSKT
              } /**    reservation?.data?.expiration_month +
                                    '/' +
                                  reservation?.data?.expiration_year */
              onBlur={(e) => {
                var sktArr = e.target.value.split('/');
                setSktMM(sktArr[0]);
                setSktYY(sktArr[1]);
                /*  dispatch(
                  setReservation({
                    expiration_month: sktArr[0],
                    expiration_year: sktArr[1],
                  })
                );*/
              }}
            />
            <Material.TextField
              mask="999"
              label="CVV"
              type="text"
              name="cvv"
              defaultValue={defaultCVV} /**reservation?.data?.cvc */
              onBlur={(e) => {
                setCVV(e.target.value);
                //dispatch(setReservation({ cvc: e.target.value }));
              }}
            />
          </Info>
          <Material.TextField
            style={{ marginBottom: '20px' }}
            label={t('Enter Amount to Load (TL)')}
            type="number"
            name="amount"
            // defaultValue={}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </DataContainer>
        <div style={{ padding: '10px' }}>
          <text>
            {t(
              'For your security, this transaction will be carried out with 3D secure'
            )}
          </text>
        </div>
        <div style={{ padding: '10px' }}>
          <Material.CheckBox
            checked={accept}
            onChange={() => {
              setOpenModal(true);
            }}
            label={
              <div>
                <span className="underline-text" onClick={() => {}}>
                  {t(
                    'I have read and approve the Preliminary Information Conditions and the Distance Sales Agreement'
                  )}
                </span>
              </div>
            }
          />
        </div>
      </InfoContainer>
      <StyledModal show={openModal} onHide={() => setOpenModal(false)}>
        <MultiContractWallet
          setOpenModal={setOpenModal}
          confirmationData={staticPages.data}
          setAccept={setAccept}
        />
      </StyledModal>
    </>
  );
};
const StyledModal = styled(Modal)`
  .modal-content {
    width: 600px;
    background-color: var(--white1);
    padding: 15px 30px;
    @media ${device.sm} {
      height: 70vh;
      width: 90vw;
      overflow: scroll;
    }
  }
`;
const Info = styled.div`
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
const Text = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;
export default CashTransferUser;
