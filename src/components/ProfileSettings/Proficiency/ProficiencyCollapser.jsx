import React, { useMemo } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Material, scrollbar, Spinner } from 'components';

const ProficiencyCollapser = ({
  data,
  addedProficiencies,
  setAddedProficiencies,
  saveProficiencyHandler,
  showInputError,
}) => {
  const { t } = useTranslation();

  const { isLoading } = useSelector(
    (state) => state.profileSettings2.proficiencySettings.addProficiency
  );

  const addedProficiencyKeys = useMemo(
    () => Object.keys(addedProficiencies),
    [addedProficiencies]
  );

  const inputsFromData = data?.speciality?.map((item, index) => (
    <Material.TextField
      key={index}
      defaultValue={item.name}
      rightTextNode={
        <StatusInfo status={item.status}>
          {item.status === 'active' && t('Approved')}
          {item.status === 'pending' && t('Waiting for approval')}
          {item.status === 'passive' && t('Denied')}
        </StatusInfo>
      }
    />
  ));

  const extraUserInputs = addedProficiencyKeys.map((key, index) => (
    <Material.TextField
      key={index}
      changeValue={addedProficiencies[key]}
      defaultValue={addedProficiencies[key]}
      onBlur={(e) =>
        setAddedProficiencies({
          ...addedProficiencies,
          [key]: e.target.value,
        })
      }
    />
  ));

  return (
    <div className="proficiency-row__collapse" id={data.id}>
      <Body className="proficiency-row__items-wrapper">
        {inputsFromData}
        {extraUserInputs}
      </Body>

      <div className="proficiency-row__save-wrapper">
        {showInputError && (
          <div className="proficiency-row__error">
            {t('Please fill in the blanks')}
          </div>
        )}

        {!!addedProficiencyKeys.length && (
          <span
            className="proficiency-row__save"
            onClick={saveProficiencyHandler}
          >
            {isLoading ? <Spinner type="static" /> : 'Kaydet'}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProficiencyCollapser;

const Body = styled.div`
  ${scrollbar};
  padding-right: 30px;
`;

const StatusInfo = styled.span`
  font-weight: 600;
  font-size: 0.8rem;
  color: ${(p) =>
    p.status === 'active' ? p.theme.colors.blue : p.theme.colors.red};
`;
