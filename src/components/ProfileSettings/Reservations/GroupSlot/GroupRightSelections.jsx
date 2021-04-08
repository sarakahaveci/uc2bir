import React from 'react';
import styled from 'styled-components/macro';

import { Accordion, Text } from 'components';

export default function GroupRightSelections() {
  return (
    <div>
      <Accordion>
        <Accordion.Item>
          <Accordion.Toggle>
            <DarkTitle>Rezervasyon Tarihi & Saati</DarkTitle>
          </Accordion.Toggle>
          <Accordion.Collapse></Accordion.Collapse>
        </Accordion.Item>
      </Accordion>

      <Text>Saat Ekle</Text>

      <Accordion>
        <Accordion.Item>
          <Accordion.Toggle>
            <DarkTitle>Seçili Spor Alanı Grup Ders Kontenjanları</DarkTitle>
          </Accordion.Toggle>
          <Accordion.Collapse></Accordion.Collapse>
        </Accordion.Item>
      </Accordion>

      <DarkTitle>Kontenjan Belirleyiniz</DarkTitle>
    </div>
  );
}

const DarkTitle = styled.h4`
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.dark};
`;
