import React from 'react';
import styled from 'styled-components/macro';

const Data = () => {
  const payment = [
    {
      id: 1,
      title: 'Paket Ödemeleri',
      name: 'Aylin',
      packageName: 'Diet',
      dersBedeli: 100,
      komisyon: 20,
      kdv: 5,
      stopaj: 1,
      toplam: 90,
      sonHareket: ' 15 - 04 - 2021',
    },
    {
      id: 2,
      title: 'Grup Ders Ödemeleri',
      name: 'Batu',
      packageName: 'Diet',
      dersBedeli: 100,
      komisyon: 20,
      stopaj: 1,
      toplam: 30,
      sonHareket: ' 1 - 04 - 2021',
    },
    {
      id: 3,
      name: 'Sedat',
      packageName: 'Full-Body',
      dersBedeli: 400,
      komisyon: 20,
      stopaj: 1,
      toplam: 50,
      sonHareket: ' 5 - 03 - 2021',
    },
    {
      id: 4,
      title: 'Banka Hesabına Transfer',
      sonHareket: ' 5 - 03 - 2021',
      toplam: 500,
      transferToBank: 500,
    },
  ];
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
          {payment &&
            payment.map((item, index) => (
              <tr key={index}>
                {item.title && <td>{item.sonHareket}</td>}
                {item.title && <td>{item.title}</td>}
                {item.title && <td>{item.toplam}₺</td>}
                {item.title && <td>1000₺</td>}
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
