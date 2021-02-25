import React from 'react';
import styled, { css } from 'styled-components/macro';

import { Text } from 'components';
import { Plus } from './Files.styles';

const FileCellRow = ({
  setIsEditClicked,
  openModal,
  fileCount = 5,
  fileName = 'Sertifika',
}) => {
  return (
    <FileRow onClick={() => setIsEditClicked(true)}>
      <FileCell>{fileCount}</FileCell>

      <Text fontSize="0.9rem" fontColor="dark" flex="1">
        {fileName}
      </Text>

      <Plus onClick={openModal}>+</Plus>
    </FileRow>
  );
};

export default FileCellRow;

const FileRow = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  flex: 0 0 45%;
  margin-bottom: 20px;
`;

const FileCell = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 11px;
  background: #fff;
  border: 1px solid ${(p) => p.theme.colors.blue};
  margin-right: 10px;
  font-weight: bold;
  font-size: 1.8rem;
  color: ${(p) => p.theme.colors.dark};
  display: flex;
  align-items: center;
  justify-content: center;

  ${(p) =>
    p.children === '0' &&
    css`
      color: ${(p) => p.theme.colors.red};
      border: 1px solid ${(p) => p.theme.colors.red}; ;
    `}
`;
