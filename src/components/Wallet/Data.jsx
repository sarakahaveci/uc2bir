import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Text } from 'components';
import { getWalletTransactionsPerPage } from 'actions/userProfileActions/walletActions';
import moment from 'moment';

const Data = ({ paymentType, date, changed }) => {
  const { data, totalPage } = useSelector(
    (state) => state?.userProfile?.wallet?.transactionsPerPage
  );
  const [page, setPage] = useState(1);
  const pageChangeHandler = (event, pageNumber) => {
    setPage(pageNumber);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWalletTransactionsPerPage(25, page, paymentType, date));
  }, [page, paymentType, date]);

  useEffect(() => {
    setPage(1);
  }, [changed]);

  return (
    <div>
      {data?.length > 0 ? (
        <div>
          <Table>
            <table>
              <tbody>
                <tr>
                  <th>Tarih</th>
                  <th>İşlem Türü</th>
                  <th>Ödeme Şekli</th>
                  <th>Tutar</th>
                </tr>
                {data &&
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>{moment(item?.updated_at).format('LLL')}</td>
                      <td>{item.info}</td>
                      <td>{item.payment_type}</td>
                      <td>{parseFloat(item.amount).toFixed(2)}₺</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Table>
          <Pagination
            mt="10px"
            page={page}
            onChange={pageChangeHandler}
            count={totalPage}
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
