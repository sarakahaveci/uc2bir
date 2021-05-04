import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletTransactions } from 'actions/userProfileActions/walletActions';
import moment from 'moment';

const Data = () => {
  // TODO : Backend den data gelecek
  const transactionsData = useSelector(
    (state) => state?.userProfile?.wallet.transactionsData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWalletTransactions());
  }, []);
  return (
    <Table>
      <table>
        <tbody>
          <tr>
            <th>Tarih</th>
            <th>Ödeme Türü</th>
            <th>Tutar</th>
            <th>Bakiye</th>
          </tr>
          {transactionsData &&
            transactionsData.map((item, index) => (
              <tr key={index}>
                <td>{moment(item?.updated_at).format('LL')}</td>
                <td>{item.transaction_info}</td>
                <td>{item.amount}₺</td>
                <td>1000₺</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Table>
  );
};

const Table = styled.div`
  width: 100%;
  height: auto;
  margin-top: 15px;

  table {
    tr {
      th {
        background: var(--blue3);
        padding: 7px;
      }
      td {
        padding: 14px 7px;
        font-size: 11pt;
        font-weight: 500;
      }
    }
  }
`;

export default Data;
