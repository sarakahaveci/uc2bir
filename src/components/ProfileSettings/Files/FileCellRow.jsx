import React from 'react';
import styled, { css } from 'styled-components/macro';

import { Text, Box, PlusButton } from 'components';
import { trainerRequiredFileCount } from '../../../constants';

const FileCellRow = ({
  setIsEditClicked,
  addFileHandler,
  file,
  setFileGroup,
  setFileTypeId,
}) => {
  const requiredCount = trainerRequiredFileCount[file.id];

  const moreItemNeeded = file.count < requiredCount;

  return (
    <FileRow
      width={['100%', '45%']}
      onClick={() => {
        setFileGroup(file);
        setIsEditClicked(true);
        setFileTypeId(file.id);
      }}
    >
      <FileCell moreItemNeeded={moreItemNeeded}>
        {moreItemNeeded ? `${file.count} / ${requiredCount}` : file.count}
      </FileCell>

      <Text fontSize="0.9rem" fontColor="dark" flex="1">
        {file.name}
      </Text>

      {moreItemNeeded && (
        <PlusButton onClick={(e) => addFileHandler(e, file.id)} />
      )}
    </FileRow>
  );
};

export default FileCellRow;

const FileRow = styled(Box)`
  display: flex;
  cursor: pointer;
  display: flex;
  align-items: center;
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
    p.moreItemNeeded &&
    css`
      color: ${(p) => p.theme.colors.red};
      border: 1px solid ${(p) => p.theme.colors.red};
      font-size: 1.2rem;
    `}
`;
