// @ts-nocheck
import React from 'react';
import Button from '../../components/buttons/button';
import IconLabel from '../../components/buttons/icon-label';

import AwesomeIcon from '../../statics/icon';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const SearchBar = ({ className, virtual, setVirtual, virtuals }) => {
  return (
    <div className={className}>
      <div className="search-container">
        <ul className="top-items">
          <li className={`${virtual === 'pt' ? 'active' : ''}`}>
            <a onClick={() => setVirtual('pt')}>EĞİTMEN</a>
          </li>
          <li className={`${virtual === 'living' ? 'active' : ''}`}>
            <a onClick={() => setVirtual('living')}>SALON</a>
          </li>
          <li className={`${virtual === 'nutritionist' ? 'active' : ''}`}>
            <a onClick={() => setVirtual('nutritionist')}>DİYETİSYEN</a>
          </li>
          <li className={`${virtual === 'map' ? 'active' : ''}`}>
            <a onClick={() => setVirtual('map')}>HARİTA</a>
          </li>
        </ul>
        <div className="search-items">
          <ul className="list-items">
            <li>
              <IconLabel
                className="item"
                text={virtuals[virtual].text}
                icon={AwesomeIcon.Search}
              />
            </li>
            <li>
              <IconLabel
                className="item"
                text="Lokasyon"
                icon={AwesomeIcon.Map}
              />
            </li>
            <li>
              <FormControl className={'material-selectbox'}>
                <InputLabel htmlFor="age-native-helper">
                  Tüm Kategoriler
                </InputLabel>
                <NativeSelect>
                  <option aria-label="None" value="" />
                  <option value={10}>EĞİTMEN</option>
                  <option value={10}>SALON</option>
                  <option value={20}>DİYETİSYEN</option>
                  <option value={30}>HARİTA</option>
                </NativeSelect>
              </FormControl>
            </li>
            <li className="buttons">
              <Button
                className="col blue"
                text="Ara"
                icon={AwesomeIcon.Search}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
