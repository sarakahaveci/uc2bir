import React, { useMemo } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';

import { Material, scrollbar, Spinner } from 'components';

const ProficiencyCollapser = ({
  data,
  addedProficiencies,
  setAddedProficiencies,
  saveProficiencyHandler,
  showInputError,
}) => {
  const { isLoading } = useSelector(
    (state) => state.profileSettings2.proficiencySettings.addProficiency
  );

  const addedProficiencyKeys = useMemo(() => Object.keys(addedProficiencies), [
    addedProficiencies,
  ]);

  const inputsFromData = data?.speciality?.map((item, index) => (
    <Material.TextField
      key={index}
      defaultValue={item.name}
      rightTextNode={
        <StatusInfo status={item.status}>
          {item.status === 'active' && 'Onaylandı'}
          {item.status === 'pending' && 'Onay Bekliyor'}
          {item.status === 'passive' && 'Reddedildi'}
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
            Lütfen boş alanları doldurunuz.
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
