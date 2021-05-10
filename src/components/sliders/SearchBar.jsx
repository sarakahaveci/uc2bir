import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

import { Button, IconLabel, AwesomeIcon, Svg } from 'components';
import { objectToParamCoverter } from 'utils';

const SearchBar = ({ className, virtual, setVirtual, virtuals }) => {
  const history = useHistory();

  const allBranchList = useSelector(
    (state) => state.profileSettings.ptBranchList.allList
  );

  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [branch, setBranch] = useState('');

  const searchProfessionalHandler = () => {
    if (virtual == 'packets') {
      const formData = {
        title,
        location,
        branch,
      };

      let baseUrl = `/packets?type=${virtual}`;

      const url = objectToParamCoverter(formData, baseUrl);

      history.push(url);
    } else if (virtual == 'group-lessons') {
      const formData = {
        title,
        location,
        branch,
      };

      let baseUrl = `/group-lessons?type=${virtual}`;

      const url = objectToParamCoverter(formData, baseUrl);

      history.push(url);
    } else {
      const formData = {
        title,
        location,
        branch,
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
            <a onClick={() => setVirtual('pt')}>EĞİTMEN</a>
          </li>
          <li className={`${virtual === 'gym' ? 'active' : ''}`}>
            <a onClick={() => setVirtual('gym')}>SALON</a>
          </li>
          <li className={`${virtual === 'dt' ? 'active' : ''}`}>
            <a onClick={() => setVirtual('dt')}>DİYETİSYEN</a>
          </li>
          <li className={`${virtual === 'map' ? 'active' : ''}`}>
            <a onClick={() => setVirtual('map')}>HARİTA</a>
          </li>
          <li className={`${virtual === 'map' ? 'active' : ''}`}>
            <a onClick={() => setVirtual('packets')}>PAKETLER</a>
          </li>
          <li className={`${virtual === 'map' ? 'active' : ''}`}>
            <a onClick={() => setVirtual('packets')}>GRUP DERSLERİ</a>
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
                  style={{ paddingBottom: '7px' }}
                />
                <NakedInput
                  placeholder="Lokasyon"
                  inputProps={{ 'aria-label': 'naked' }}
                  onChange={(event) => setLocation(event.target.value)}
                />
              </li>
            )}
            <li>
              <IconLabel icon={Svg.SearchBranches} />
              <FormControl
                className={'material-selectbox'}
                onChange={(event) => setBranch(event.target.value)}
              >
                <InputLabel htmlFor="age-native-helper">Branşlar</InputLabel>
                <NativeSelect>
                  <option aria-label="None" value="" />
                  {allBranchList.map((item, index) => (
                    <option key={'option' + index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </li>
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

export default SearchBar;
