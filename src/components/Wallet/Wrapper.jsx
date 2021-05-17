import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Text, Accordion, Box, Svg } from 'components';
import styled from 'styled-components/macro';
import moment from 'moment';
import { getWalletTransactions } from 'actions/userProfileActions/walletActions';

const Wrapper = () => {
  const transactionsData = useSelector(
    (state) => state?.userProfile?.wallet.transactionsData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWalletTransactions());
  }, []);

  // TODO : Backend tarafından data gelecek
  return (
    <div>
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
                {transactionsData[transactionsData.length - 1]?.info}
              </Text>
              <Capsule>
                <CapsuleItem>
                  <Text textAlign="left" fontWeight="600">
                    {' '}
                    Oluşturma Tarihi |{' '}
                    {moment(
                      transactionsData[transactionsData.length - 1]?.updated_at
                    ).format('LL')}
                  </Text>
                </CapsuleItem>
                <CapsuleItem>
                  <table>
                    <tbody>
                      {transactionsData[transactionsData.length - 1]
                        ?.payment_type && (
                        <tr>
                          <td>Ödeme Şekli</td>
                          <td className="text-right">
                            {
                              transactionsData[transactionsData.length - 1]
                                ?.payment_type
                            }
                          </td>
                        </tr>
                      )}
                      {transactionsData[transactionsData.length - 1]
                        ?.status && (
                        <tr>
                          <td>Durumu</td>
                          <td className="text-right">
                            {
                              transactionsData[transactionsData.length - 1]
                                ?.status
                            }
                          </td>
                        </tr>
                      )}
                      {transactionsData[transactionsData.length - 1]
                        ?.amount && (
                        <tr>
                          <td>Miktar</td>
                          <td className="text-right">
                            {
                              transactionsData[transactionsData.length - 1]
                                ?.amount
                            }
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
