import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { Span } from 'components';

const SubTabs = ({ data, onChange, lineWidth = '50%', className }) => {
  const [activeSubIndex, setActiveSubIndex] = useState(0);

  return (
    <LineWrapper className={className}>
      {data.map((item, index) => (
        <Tab
          key={index}
          isActive={activeSubIndex === index}
          onClick={() => {
            setActiveSubIndex(index);
            onChange(item.value);
          }}
        >
          <Span lineWidth={lineWidth} underline={activeSubIndex === index}>
            {item.icon && <img src={item.icon} alt={item.label} />} {item.label}
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
  justify-content: center;
`;

const Tab = styled.div`
  cursor: pointer;
  border-bottom: ${(p) => `1px solid ${p.theme.colors.gray5}`};
  padding-right: 30px;
  padding-bottom: 4px;
  color: ${(p) => (p.isActive ? p.theme.colors.blue : p.theme.colors.gray1)};
  font-weight: 500;
  @media (max-width: 720px) {
    padding-right: 15px;
  }
`;
