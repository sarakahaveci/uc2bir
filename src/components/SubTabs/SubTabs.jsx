import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { Span } from 'components';

const SubTabs = ({ data, onChange }) => {
  const [activeSubIndex, setActiveSubIndex] = useState(0);

  return (
    <LineWrapper>
      {data.map((item, index) => (
        <Tab
          isActive={activeSubIndex === index}
          onClick={() => {
            setActiveSubIndex(index);
            onChange(item.value);
          }}
        >
          <Span lineWidth="50%" underline={activeSubIndex === index}>
            {item.label}
          </Span>
        </Tab>
      ))}
    </LineWrapper>
  );
};

export default SubTabs;

const LineWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const Tab = styled.div`
  cursor: pointer;
  border-bottom: ${(p) => `1px solid ${p.theme.colors.gray5}`};
  padding-right: 30px;
  padding-bottom: 4px;
  color: ${(p) => (p.isActive ? p.theme.colors.blue : p.theme.colors.gray1)};
  font-weight: 500;
`;
