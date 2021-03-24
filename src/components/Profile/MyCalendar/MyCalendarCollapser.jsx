import React from 'react';
import styled from 'styled-components/macro';

export default function MyCalendarCollapser() {
  return (
    <div>
      <TimeCell />
    </div>
  );
}

const TimeCell = styled.div`
  width: 54px;
  height: 45px;
  border-radius: 15px;
  background: #fff;
  border: 1px solid #909090;
`;
