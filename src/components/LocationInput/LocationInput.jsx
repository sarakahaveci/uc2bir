// @ts-nocheck
import React, { useEffect } from 'react';


import styled from 'styled-components/macro';
import InputBase from '@material-ui/core/InputBase';

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
const LocationInput = ({
    defaultValue,
    onChange = () => { },
    placeholder = ""
}) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        defaultValue: defaultValue,
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    });

    useEffect(() => {
        onChange(value)
    }, [value])

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
    const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };
    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { secondary_text },
            } = suggestion;

            return (
                <div style={{ margin: '5px' }} key={place_id} onClick={handleSelect(suggestion)}>
                    <small style={{fontWeight:'bold'}}>{secondary_text}</small>
                </div>
            );
        });
    return (
        <div style={{ display: 'flex' }} ref={ref}>
            <NakedInput
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'naked' }}
                disabled={!ready}
                value={value}
                onChange={handleInput}
            />
            {status === "OK" && <Sugg>

                <div style={{
                    background: 'white',
                    display:'flex',
                    flexDirection: 'column'
                }} >{renderSuggestions()}</div>

            </Sugg>}
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
const Sugg = styled.div`
display:flex;
position: absolute;
z-index:999999;
margin-top: 45px;
padding: 10px;
border-radius:5px;
background:white;
max-height:100px;
max-width:370px;
overflow:scroll;
`
export default LocationInput;