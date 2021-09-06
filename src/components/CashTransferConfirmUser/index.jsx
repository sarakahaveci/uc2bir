import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { Button } from 'components';
import { getWallet } from 'actions/userProfileActions/walletActions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function CashTransferConfirmUser({
  amount,
  cardName,
  cardNo,
  sktMM,
  sktYY,
  CVV,
}) {
  const { t } = useTranslation();

  const wallet = useSelector((state) => state?.userProfile?.wallet);
  const { accessToken } = useSelector((state) => state.auth);
  const formRef = useRef(null);
  const [paymentData, setPaymentData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWallet());
  }, []);

  const getPaymentData = () => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/user/wallet/load-balance`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    if (amount && amount > 0) {
      const formData = new FormData();
      formData.append('payment_amount', amount);
      formData.append('user_basket[]', `deposit,${amount}`);
      axios({
        ...config,
        data: formData,
      })
        .then(function (res) {
          setPaymentData(res?.data?.data);
          formRef.current.submit();
        })
        .catch(function (err) {
          // eslint-disable-next-line
          console.log(err);
        });
    }
  };

  return (
    <Container>
      <InfoContainer>
        <DataContainer>
          <Info>
            <Text style={{ fontWeight: 600 }}>{t('your wallet')}</Text>
            <br />
            <Text style={{ fontWeight: 400 }}>
              Cüzdanınızda <u>{wallet?.data?.balance}₺</u> bulunmaktadır.
            </Text>
          </Info>

          <ConfirmContainer>
            <BottomContainer>
              <Text style={{ fontWeight: 800 }}>{t('Total Fee')}</Text>
              <Text color="#00B2A9" style={{ fontWeight: 600, fontSize: 20 }}>
                {amount ? amount : 0}₺
              </Text>
            </BottomContainer>
            <br />
            <BottomContainer>
              <Button
                style={{ width: '100%', padding: '20px' }}
                className="blue"
                text="Ödeme Yap"
                onClick={() => {
                  getPaymentData();
                }}
              />
            </BottomContainer>
          </ConfirmContainer>
        </DataContainer>
      </InfoContainer>
      <form ref={formRef} action="https://www.paytr.com/odeme" method="POST">
        {/* <input type="hidden" name="cc_owner" value="PAYTR TEST" />
        <input type="hidden" name="card_number" value="9792030394440796" />
        <input type="hidden" name="expiry_month" value="12" />
        <input type="hidden" name="expiry_year" value="24" />
        <input type="hidden" name="cvv" value="000" /> */}

        <input type="hidden" name="cc_owner" value={cardName} />
        <input type="hidden" name="card_number" value={cardNo} />
        <input type="hidden" name="expiry_month" value={sktMM} />
        <input type="hidden" name="expiry_year" value={sktYY} />
        <input type="hidden" name="cvv" value={CVV} />

        <input type="hidden" name="card_type" value={paymentData?.card_type} />
        <input type="hidden" name="currency" value={paymentData?.currency} />
        <input type="hidden" name="debug_on" value={paymentData?.debug_on} />
        <input type="hidden" name="email" value={paymentData?.email} />
        <input
          type="hidden"
          name="installment_count"
          value={paymentData?.installment_count}
        />
        <input type="hidden" name="lang" value={paymentData?.lang} />
        <input
          type="hidden"
          name="max_installment"
          value={paymentData?.max_installment}
        />
        <input
          type="hidden"
          name="merchant_fail_url"
          value={paymentData?.merchant_fail_url}
        />
        <input
          type="hidden"
          name="merchant_id"
          value={paymentData?.merchant_id}
        />
        <input
          type="hidden"
          name="merchant_oid"
          value={paymentData?.merchant_oid}
        />
        <input
          type="hidden"
          name="merchant_ok_url"
          value={paymentData?.merchant_ok_url}
        />
        <input
          type="hidden"
          name="no_installment"
          value={paymentData?.no_installment}
        />
        <input
          type="hidden"
          name="non3d_test_failed"
          value={paymentData?.non3d_test_failed}
        />
        <input type="hidden" name="non_3d" value={paymentData?.non_3d} />
        <input
          type="hidden"
          name="payment_amount"
          value={paymentData?.payment_amount}
        />
        <input
          type="hidden"
          name="payment_type"
          value={paymentData?.payment_type}
        />
        <input
          type="hidden"
          name="paytr_token"
          value={paymentData?.paytr_token}
        />

        <input type="hidden" name="test_mode" value={paymentData?.test_mode} />
        <input
          type="hidden"
          name="user_address"
          value={paymentData?.user_address}
        />
        <input
          type="hidden"
          name="user_basket"
          value={paymentData?.user_basket}
        />
        <input type="hidden" name="user_ip" value={paymentData?.user_ip} />
        <input type="hidden" name="user_name" value={paymentData?.user_name} />
        <input
          type="hidden"
          name="user_phone"
          value={paymentData?.user_phone}
        />
      </form>
    </Container>
  );
}
const Container = styled.div`
  margin-top: 40px;
`;
const InfoContainer = styled.div`
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
  padding: 50px 20px;
`;

const Text = styled.text`
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};

  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;

const Info = styled.div`
  border-style: solid;
  border-color: rgba(144, 144, 144, 0.5);
  border-width: 0 0 1px 0;
  padding: 10px 5px;
`;
const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
