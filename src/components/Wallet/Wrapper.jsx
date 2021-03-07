import React from 'react';

import { Text, Title, Accordion, Box, Button, Svg } from 'components';
import styled from 'styled-components/macro';

const Wrapper = () => {
  return (
    <StyledWrapper>
      <Accordion.Item>
        <Accordion.Toggle>
          <SettingsRow>
            <Box col>
              <Text color="dark" textAlign="left" fontWeight="500" p="2px">
                Ödeme Seçiniz
              </Text>
            </Box>

            <Svg.ArrowUpIcon />
          </SettingsRow>
        </Accordion.Toggle>
        <Accordion.Collapse>
          <BodyWrapper>
            <Text>
              <b>Son Hareket</b> | 15 Kasım, Pazar
            </Text>
            <Capsule>
              <CapsuleItem>
                <Title textAlign="left">Aylin Gümüş</Title>
                <Title textAlign="left" fontWeight="normal">
                  Zayıflama Paketi
                </Title>
              </CapsuleItem>
              <CapsuleItem>
                <table>
                  <tbody>
                    <tr>
                      <td>Ders Bedeli</td>
                      <td className="text-right">500 ₺</td>
                    </tr>
                    <tr>
                      <td>Komisyon %10</td>
                      <td className="text-right">500 ₺</td>
                    </tr>
                    <tr>
                      <td>Kdv %8</td>
                      <td className="text-right">500 ₺</td>
                    </tr>
                    <tr>
                      <td>Stopaj %20</td>
                      <td className="text-right">500 ₺</td>
                    </tr>
                  </tbody>
                </table>
              </CapsuleItem>
              <CapsuleItem>
                <table>
                  <tbody>
                    <tr>
                      <td>Toplam</td>
                      <td className="text-right font-weight-bold">500 ₺</td>
                    </tr>
                  </tbody>
                </table>
              </CapsuleItem>
            </Capsule>
          </BodyWrapper>
        </Accordion.Collapse>
      </Accordion.Item>
    </StyledWrapper>
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
    background: transparent!important;

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
