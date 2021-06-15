import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import InputBase from '@material-ui/core/InputBase';

import { Button, IconLabel, AwesomeIcon, Svg, Material } from 'components';
import { objectToParamCoverter } from 'utils';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

const SearchBar = ({ className, virtual, setVirtual, virtuals }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  

  
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });
  const handleSelect =
    ({ description }) =>
      () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
          .then((results) => getLatLng(results[0]))
          .then(() => {
           // console.log("📍 Coordinates: ", { lat, lng });
          })
          .catch(() => {
           // console.log("😱 Error: ", error);
          });
      };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { secondary_text },
      } = suggestion;

      return (
        <li style={{backgroundColor:'white',margin:'5px'}} key={place_id} onClick={handleSelect(suggestion)}>
           <small>{secondary_text}</small>
        </li>
      );
    });
    const handleInput = (e) => {
      // Update the keyword of the input element
      setValue(e.target.value);
    };
  const history = useHistory();

  const allBranchList = useSelector(
    (state) => state.profileSettings.ptBranchList.allList
  );

  const [title, setTitle] = useState('');
  const [branch, setBranch] = useState('');

  const searchProfessionalHandler = () => {
    if (virtual == 'packets') {
      const formData = {
        title,
        location:value,
        branch,
      };

      let baseUrl = `/packets?type=${virtual}`;

      const url = objectToParamCoverter(formData, baseUrl);

      history.push(url);
    } else if (virtual == 'group-lessons') {
      const formData = {
        title,
        location:value,
        branch,
      };

      let baseUrl = `/group-lessons?type=${virtual}`;

      const url = objectToParamCoverter(formData, baseUrl);

      history.push(url);
    } else {
      const formData = {
        title,
        location:value,
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
          <li className={`${virtual === 'packets' ? 'active' : ''}`}>
            <a onClick={() => setVirtual('packets')}>PAKETLER</a>
          </li>
          <li className={`${virtual === 'group-lessons' ? 'active' : ''}`}>
            <a onClick={() => setVirtual('group-lessons')}>GRUP DERSLERİ</a>
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
                <div style={{display:'flex'}} ref={ref}>
                  <NakedInput
                    placeholder="Lokasyon"
                    inputProps={{ 'aria-label': 'naked' }}
                    disabled={!ready}
                    value={value}

                    onChange={handleInput}
                    />
                  {status === "OK" && <ul style={{position: 'absolute',background:'white',bottom:'-80px',zIndex:'99999999999999'}} >{renderSuggestions()}</ul>}
                </div>

              </li>
            )}
            {
              virtual !== 'dt' && (
                <li>
                  <IconLabel
                    icon={Svg.SearchBranches}
                    style={{ paddingTop: '5px' }}
                  />
                  <Material.SimpleSelect
                    label="Tüm Kategoriler"
                    items={allBranchList}
                    onChange={(event) => setBranch(event.target.value)}
                  />
                </li>
              )
            }
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
