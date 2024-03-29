import React from 'react';
import styled, { css } from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import { PlusButton, Text, Svg } from 'components';

const ProficiencyToggler = ({
  data,
  addedProficiencies,
  setAddedProficiencies,
  isActive,
}) => {
  const { t } = useTranslation();

  const addProficiencyHandler = (e) => {
    if (isActive) {
      e.stopPropagation();
    }

    setAddedProficiencies({
      ...addedProficiencies,
      [Object.keys(addedProficiencies).length]: '',
    });
  };

  return (
    <ToggleRow isActive={isActive}>
      <div className="proficiency-row__left-wrapper">
        <img src={data.icon} alt={data.name} className="proficiency-row__img" />

        <Text
          letterSpacing="2px"
          color="dark"
          fontSize="0.9rem"
          fontWeight="600"
          textTransform="uppercase"
          pl="10px"
        >
          {data.name}
        </Text>
      </div>

      <div className="proficiency-row__right-wrapper">
        <Text mr="10px" color="dark" fontSize="0.9rem">
          {t('Add Specialization')}
        </Text>

        <PlusButton onClick={addProficiencyHandler} />
      </div>

      <Svg.ArrowUpIcon className="proficiency-row__arrow-up" />
    </ToggleRow>
  );
};

export default ProficiencyToggler;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;

  ${(p) =>
    p.isActive &&
    css`
      border-bottom: 0.5px solid #dbd5d5;

      .proficiency-row__arrow-up {
        transition: all 0.3s;
        transform: ${(p) => p.isActive && 'rotate(180deg)'};
      }
    `}
`;
