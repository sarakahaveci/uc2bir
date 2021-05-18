import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Text } from 'components';
import {
  getWalletTransactions,
  getWallet,
} from 'actions/userProfileActions/walletActions';
import moment from 'moment';

const Data = () => {
  // TODO : Backend den data gelecek
  const wallet = useSelector((state) => state?.userProfile?.wallet);
  const transactionsData = useSelector(
    (state) => state?.userProfile?.wallet.transactionsData
  );

  // const [page, setPage] = useState(1);
  // const pageChangeHandler = (event, value) => setPage(value);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWallet());
    dispatch(getWalletTransactions());
  }, []);
  return (
    <div>
      {transactionsData.length > 0 ? (
        <div>
          <Table>
            <table>
              <tbody>
                <tr>
                  <th>Tarih</th>
                  <th>Ödeme Şekli</th>
                  <th>Tutar</th>
                  <th>Bakiye</th>
                </tr>
                {transactionsData &&
                  transactionsData.map((item, index) => (
                    <tr key={index}>
                      <td>{moment(item?.updated_at).format('LLL')}</td>
                      <td>{item.payment_type}</td>
                      <td>{item.amount}₺</td>
                      <td> {wallet?.data?.balance}₺</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Table>
          <Pagination
            mt="10px"
            // page={pageNumber}
            // onChange={pageChangeHandler}
            // count={}
          />
        </div>
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

export default Data;
