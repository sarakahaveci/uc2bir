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
      value={item.name}
      defaultValue={item.name}
      rightTextNode={
        <StatusInfo isPending={item.status === 'pending'}>
          {item.status === 'pending' ? 'Onay Bekliyor' : 'Onaylandı'}
        </StatusInfo>
      }
    />
  ));

  const extraUserInputs = addedProficiencyKeys.map((key, index) => (
    <Material.TextField
      key={index}
      value={addedProficiencies[key]}
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
    <div className="proficiency-row__collapse">
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
            {isLoading ? <Spinner /> : 'Kaydet'}
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

  color: ${(p) => (p.isPending ? p.theme.colors.red : p.theme.colors.blue)};
`;
