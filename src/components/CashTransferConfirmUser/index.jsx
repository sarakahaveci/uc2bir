import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { Button } from 'components';
import { getWallet } from 'actions/userProfileActions/walletActions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export default function CashTransferConfirmUser({ amount }) {
  const wallet = useSelector((state) => state?.userProfile?.wallet);
  const { accessToken } = useSelector((state) => state.auth);
  // const formRef = useRef(null);

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
      axios({
        ...config,
        data: { payment_amount: amount, user_basket: { deposit: amount } },
      })
        .then(function () {
          // console.log(res);
        })
        .catch(function () {
          // console.log(err);
        });
    }
  };

  return (
    <Container>
      <InfoContainer>
        <DataContainer>
          <Info>
            <Text style={{ fontWeight: 600 }}>Cüzdanınız</Text>
            <br />
            <Text style={{ fontWeight: 300 }}>
              Cüzdanınızda {wallet?.data?.balance} ₺ bulunmaktadır.
            </Text>
          </Info>

          <ConfirmContainer>
            <BottomContainer>
              <Text style={{ fontWeight: 800 }}>Toplam Ücret</Text>
              <Text color="#00B2A9" style={{ fontWeight: 800, fontSize: 20 }}>
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
      {/* <form ref={formRef} action="https://www.paytr.com/odeme" method="POST">
        <input
          type="hidden"
          name="cc_owner"
          value={reservation?.data?.holder_name}
        />
        <input
          type="hidden"
          name="card_number"
          value={reservation?.data?.card_number?.replace(/\s/g, '')}
        />
        <input
          type="hidden"
          name="expiry_month"
          value={reservation?.data?.expiration_month}
        />
        <input
          type="hidden"
          name="expiry_year"
          value={reservation?.data?.expiration_year}
        />
        <input type="hidden" name="cvv" value={reservation?.data?.cvc} />

        <input
          type="hidden"
          name="card_type"
          value={payment?.request?.data?.card_type}
        />
        <input
          type="hidden"
          name="currency"
          value={payment?.request?.data?.currency}
        />
        <input
          type="hidden"
          name="debug_on"
          value={payment?.request?.data?.debug_on}
        />
        <input
          type="hidden"
          name="email"
          value={payment?.request?.data?.email}
        />
        <input
          type="hidden"
          name="installment_count"
          value={payment?.request?.data?.installment_count}
        />
        <input type="hidden" name="lang" value={payment?.request?.data?.lang} />
        <input
          type="hidden"
          name="max_installment"
          value={payment?.request?.data?.max_installment}
        />
        <input
          type="hidden"
          name="merchant_fail_url"
          value={payment?.request?.data?.merchant_fail_url}
        />
        <input
          type="hidden"
          name="merchant_id"
          value={payment?.request?.data?.merchant_id}
        />
        <input
          type="hidden"
          name="merchant_oid"
          value={payment?.request?.data?.merchant_oid}
        />
        <input
          type="hidden"
          name="merchant_ok_url"
          value={payment?.request?.data?.merchant_ok_url}
        />
        <input
          type="hidden"
          name="no_installment"
          value={payment?.request?.data?.no_installment}
        />
        <input
          type="hidden"
          name="non3d_test_failed"
          value={payment?.request?.data?.non3d_test_failed}
        />
        <input
          type="hidden"
          name="non_3d"
          value={payment?.request?.data?.non_3d}
        />
        <input
          type="hidden"
          name="payment_amount"
          value={payment?.request?.data?.payment_amount}
        />
        <input
          type="hidden"
          name="payment_type"
          value={payment?.request?.data?.payment_type}
        />
        <input
          type="hidden"
          name="paytr_token"
          value={payment?.request?.data?.paytr_token}
        />

        <input
          type="hidden"
          name="test_mode"
          value={payment?.request?.data?.test_mode}
        />
        <input
          type="hidden"
          name="user_address"
          value={payment?.request?.data?.user_address}
        />
        <input
          type="hidden"
          name="user_basket"
          value={payment?.request?.data?.user_basket}
        />
        <input
          type="hidden"
          name="user_ip"
          value={payment?.request?.data?.user_ip}
        />
        <input
          type="hidden"
          name="user_name"
          value={payment?.request?.data?.user_name}
        />
        <input
          type="hidden"
          name="user_phone"
          value={payment?.request?.data?.user_phone}
        />
      </form> */}
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
