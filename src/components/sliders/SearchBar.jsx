import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import InputBase from '@material-ui/core/InputBase';

import {
  Button,
  IconLabel,
  AwesomeIcon,
  Svg,
  Material,
  LocationInput,
  ChooseDateModal,
} from 'components';
import { objectToParamCoverter } from 'utils';
import { useTranslation } from 'react-i18next';
const SearchBar = ({ className, virtual, setVirtual, virtuals }) => {
  const [value, setValue] = useState('');
  const [dateFilterText, setDateFilterText] = useState('Tarih Seçiniz');
  const [openDateModal, setOpenDateModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const history = useHistory();
  const { t } = useTranslation();

  const allBranchList = useSelector(
    (state) => state.profileSettings.ptBranchList.allList
  );

  const [title, setTitle] = useState('');
  const [branch, setBranch] = useState('');

  const searchProfessionalHandler = () => {
    if (virtual == 'packets') {
      const formData = {
        title,
        location: value,
        branch,
      };

      let baseUrl = `/packets?type=${virtual}`;

      const url = objectToParamCoverter(formData, baseUrl);

      history.push(url);
    } else if (virtual == 'group-lessons') {
      const formData = {
        title,
        location: value,
        branch,
        startDate,
        endDate,
      };

      let baseUrl = `/group-lessons?type=${virtual}`;

      const url = objectToParamCoverter(formData, baseUrl);

      history.push(url);
    } else {
      const formData = {
        title,
        location: value,
        branch,
        startDate,
        endDate,
      };

      let baseUrl = `/find?type=${virtual}`;

      const url = objectToParamCoverter(formData, baseUrl);

      history.push(url);
    }
  };

  return (
    <div className={className}>
      <div className="search-container">
        <ul className="top-items">
          <li className={`${virtual === 'pt' ? 'active' : ''}`}>
            <a onClick={() => setVirtual('pt')}>{t('trainer')}</a>
          </li>
          <li className={`${virtual === 'gym' ? 'active' : ''}`}>
            <a onClick={() => setVirtual('gym')}>{t('gym')}</a>
          </li>
          <li className={`${virtual === 'dt' ? 'active' : ''}`}>
            <a onClick={() => setVirtual('dt')}>{t('dietitian')}</a>
          </li>
          <li className={`${virtual === 'map' ? 'active' : ''}`}>
            <a onClick={() => setVirtual('map')}>{t('map')}</a>
          </li>
          <li className={`${virtual === 'packets' ? 'active' : ''}`}>
            <a onClick={() => setVirtual('packets')}>{t('packages')}</a>
          </li>
          <li className={`${virtual === 'group-lessons' ? 'active' : ''}`}>
            <a onClick={() => setVirtual('group-lessons')}>
              {t('groupLessons')}
            </a>
          </li>
        </ul>
        <div className="search-items">
          <ul className="list-items">
            <li>
              <IconLabel
                icon={Svg.SearchBoard}
                style={{ paddingBottom: '5px' }}
              />
              <NakedInput
                placeholder={virtuals[virtual].text}
                inputProps={{ 'aria-label': 'naked' }}
                onChange={(event) => setTitle(event.target.value)}
              />
            </li>
            {virtual !== 'packets' && virtual !== 'group-lessons' && (
              <li>
                <IconLabel
                  icon={Svg.SearchLocation}
                  style={{ paddingBottom: '6px' }}
                />
                <LocationInput
                  defaultValue={value}
                  onChange={(e) => {
                    setValue(e);
                  }}
                  placeholder={t('location')}
                />
              </li>
            )}
            {virtual !== 'dt' && (
              <li>
                <IconLabel
                  icon={Svg.SearchBranches}
                  style={{ paddingTop: '5px' }}
                />
                <Material.SimpleSelect
                  label={t('allCategories')}
                  items={allBranchList}
                  onChange={(event) => setBranch(event.target.value)}
                />
              </li>
            )}
            {virtual !== 'packets' && virtual !== 'group_lessons' && (
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FilterButton onClick={() => setOpenDateModal(true)}>
                  {dateFilterText}
                  <div style={{ marginLeft: 20, transform: 'rotate(90deg)' }}>
                    {' '}
                    {'>'}{' '}
                  </div>
                </FilterButton>
              </li>
            )}
            <li className="buttons">
              <Button
                className="col blue"
                text="Ara"
                icon={AwesomeIcon.Search}
                onClick={searchProfessionalHandler}
              />
            </li>
          </ul>
        </div>
      </div>
      <ChooseDateModal
        open={openDateModal}
        cancel={() => {
          setOpenDateModal(false);
        }}
        setDateFilterText={setDateFilterText}
        setEndDateToApi={setEndDate}
        setStartDateToApi={setStartDate}
      />
    </div>
  );
};

const NakedInput = styled(InputBase)`
  input {
    border: none;
    background: transparent;
    font-size: 18px;
    color: black;
  }
`;

const FilterButton = styled.button`
  cursor: pointer;
  border: none;
  z-index: 2;
  display: flex;
  background: transparent;
  font-size: 18px;
  color: black;
  justify-content: center;
  align-items: center;
`;

export default SearchBar;
