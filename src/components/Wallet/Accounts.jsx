import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { Title, Svg } from 'components';
import { Material } from 'components';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components/macro';
import { getBankAccount } from 'actions/userProfileActions/walletActions';

const TransferInfo = () => {
  const data = useSelector((state) => state?.userProfile?.wallet?.bankAccounts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBankAccount());
  }, []);

  return (
    <>
      {data &&
        data.map((item, index) => (
          <DataContainer key={index}>
            <Title textAlign="left" fontWeight="500">
              Kayıt Adı : {item.bank_title}{' '}
            </Title>
            <Svg.Pencil
              style={{
                textAlign: 'right',
                marginBottom: '20px',
                cursor: 'pointer',
              }}
            />
            <Explanation>
              <Col>
                <Title textAlign="left">Alıcı Adı Soyadı </Title>
              </Col>
              |
              <Col>
                <TitleWrapper>
                  <Title
                    textAlign="right"
                    style={{ display: 'flex' }}
                    fontWeight="400"
                  >
                    {item.username}
                  </Title>
                </TitleWrapper>
              </Col>
            </Explanation>
            <Explanation>
              <Col>
                <Title textAlign="left">Alıcı IBAN No </Title>
              </Col>
              |
              <Col>
                <TitleWrapper>
                  <Title
                    textAlign="right"
                    style={{ display: 'flex' }}
                    fontWeight="400"
                  >
                    TR{item.iban_no}
                  </Title>
                </TitleWrapper>
              </Col>
            </Explanation>
            <CheckBoxWrapper>
              <Material.CheckBox
                checked
                onChange={() => {}}
                style={{ marginTop: '20px' }}
                label={
                  <div>
                    <span onClick={() => {}}>
                      Varsayılan Hesap Olarak Ayarla
                    </span>
                  </div>
                }
              />
            </CheckBoxWrapper>
          </DataContainer>
        ))}
    </>
  );
};

const DataContainer = styled.div`
  width: 100%;
  background: white;
  margin-top: 20px;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #00b2a9;
  padding: 20px 20px;
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
`;
const Explanation = styled.section`
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &:before {
    position: absolute;
    width: calc(100%);
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const CheckBoxWrapper = styled.div`
  margin-top: 20px;
  margin-left: 20px;
`;

export default TransferInfo;
