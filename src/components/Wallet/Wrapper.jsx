import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Text, Accordion, Box, Svg } from 'components';
import styled from 'styled-components/macro';
import moment from 'moment';
import { getWalletTransactions } from 'actions/userProfileActions/walletActions';

const Wrapper = () => {
  const transactionsData = useSelector(
    (state) => state?.userProfile?.wallet.transactionsData.data
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWalletTransactions());
  }, []);

  return (
    <div>
      {transactionsData?.length > 0 ? (
        <StyledWrapper>
          <Accordion.Item>
            <Accordion.Toggle>
              <SettingsRow>
                <Box col>
                  <Text color="dark" textAlign="left" fontWeight="800" p="2px">
                    Son Hareket
                  </Text>
                </Box>
                <Svg.ArrowUpIcon />
              </SettingsRow>
            </Accordion.Toggle>
            <Accordion.Collapse>
              <BodyWrapper>
                <Text textAlign="left" fontWeight="600" p="2px" color="#00b2a9">
                  {transactionsData[0]?.info}
                </Text>
                <Capsule>
                  {transactionsData[0]?.updated_at && (
                    <CapsuleItem>
                      <Text textAlign="left" fontWeight="600">
                        {' '}
                        Oluşturma Tarihi |{' '}
                        {moment(transactionsData[0]?.updated_at).format('LLL')}
                      </Text>
                    </CapsuleItem>
                  )}

                  <CapsuleItem>
                    <table>
                      <tbody>
                        {transactionsData[0]?.payment_type && (
                          <tr>
                            <td>Ödeme Şekli</td>
                            <td className="text-right">
                              {transactionsData[0]?.payment_type}
                            </td>
                          </tr>
                        )}
                        {transactionsData[0]?.status && (
                          <tr>
                            <td>Durumu</td>
                            <td className="text-right">
                              {transactionsData[0]?.status}
                            </td>
                          </tr>
                        )}
                        {!transactionsData[0]?.amount == 0 && (
                          <tr>
                            <td>Tutar</td>
                            <td className="text-right">
                              {transactionsData[0]?.amount?.toFixed(2)}₺
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </CapsuleItem>
                </Capsule>
              </BodyWrapper>
            </Accordion.Collapse>
          </Accordion.Item>
        </StyledWrapper>
      ) : (
        <Capsule>
          {' '}
          <CapsuleItem>
            <Text color="dark" textAlign="left" fontWeight="500" p="5px">
              Herhangi bir veri bulunamadı.
            </Text>
          </CapsuleItem>
        </Capsule>
      )}
    </div>
  );
};

const Capsule = styled.div`
  width: 75%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding-left: 15px;
  margin: 10px 0;

  &:before {
    content: '';
    width: 3px;
    background: #ffc47c;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const CapsuleItem = styled.div`
  width: 100%;
  height: auto;
  padding-bottom: 7px;
  border-bottom: 1px solid #ddd;

  tr {
    background: transparent !important;

    td {
      padding: 7px 0;
    }
  }
`;

const StyledWrapper = styled.div`
  margin-top: 15px;
  border-radius: 15px;
  background: #f2f4f4;
  box-shadow: 2px 3px 18px rgba(0, 0, 0, 0.09);
  padding: 15px;
`;

const SettingsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid transparent;
  border-bottom: ${(p) => p.isActive && `1px solid ${p.theme.colors.gray5}`};
  padding: 10px 15px;

  svg {
    transition: all 0.5s;
    transform: ${(p) => p.isActive && 'rotate(180deg)'};
  }
`;

const BodyWrapper = styled.div`
  padding: 10px 15px;
`;

export default Wrapper;
