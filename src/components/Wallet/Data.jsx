import React from 'react';
import styled from 'styled-components/macro';

const Data = () => {
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
          <tr>
            <td>8.11.2020 - 15:00</td>
            <td>Yoga Grup Dersi</td>
            <td>+ 620 ₺</td>
            <td>1.620 ₺</td>
          </tr>
          <tr>
            <td>8.11.2020 - 15:00</td>
            <td>Yoga Grup Dersi</td>
            <td>+ 620 ₺</td>
            <td>1.620 ₺</td>
          </tr>
          <tr>
            <td>8.11.2020 - 15:00</td>
            <td>Yoga Grup Dersi</td>
            <td>+ 620 ₺</td>
            <td>1.620 ₺</td>
          </tr>
          <tr>
            <td>8.11.2020 - 15:00</td>
            <td>Yoga Grup Dersi</td>
            <td>+ 620 ₺</td>
            <td>1.620 ₺</td>
          </tr>
          <tr>
            <td>8.11.2020 - 15:00</td>
            <td>Yoga Grup Dersi</td>
            <td>+ 620 ₺</td>
            <td>1.620 ₺</td>
          </tr>
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
