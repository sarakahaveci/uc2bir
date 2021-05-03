import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { Svg, Text } from 'components';
import GroupLeftSelections from './GroupLeftSelections';
import GroupRightSelections from './GroupRightSelections';
import styled from 'styled-components/macro';

export default function GroupSlot({
  setTabPage,
  setTab,
}) {
  return (
    <>
      <BackLink onClick={() => setTabPage('')}>
        <Svg.ArrowLeftIcon />

        <span>Haftalık Şablon Oluştur</span>
      </BackLink>

      <Row>
        <Col lg={6}>
          <GroupLeftSelections />
        </Col>

        <Col lg={6}>
          <GroupRightSelections setTabPage={setTabPage} setTab={setTab} />
        </Col>
      </Row>
    </>
  );
}

const BackLink = styled(Text)`
  display: flex;
  cursor: pointer;
  margin-bottom: 15px;

  svg {
    margin-top: 2px;
  }

  > span {
    margin-left: 10px;
    color: ${(p) => p.theme.colors.softDark};
    font-weight: 600;
    font-size: 1.2rem;
  }
`;
