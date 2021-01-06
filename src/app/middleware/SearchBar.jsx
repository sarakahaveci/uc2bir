// @ts-nocheck
import React from 'react';
import IconButtonLabel from '../../components/buttons/icon-button-label';
import IconLabel from '../../components/buttons/icon-label';

import AwesomeIcon from '../../statics/icon';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const SearchBar = ({ className }) => {
    return (
        <div className={className}>
            <div className="search-container">
                <ul className="top-items">
                    <li className="active"><a href="#">PT</a></li>
                    <li><a href="#">SALON</a></li>
                    <li><a href="#">DİYETİSYEN</a></li>
                    <li><a href="#">HARİTA</a></li>
                </ul>
                <div className="search-items">
                    <ul className="list-items">
                        <li><IconLabel className="item" text="Eğitmen Ara" icon={AwesomeIcon.Search} /></li>
                        <li><IconLabel className="item" text="Lokasyon" icon={AwesomeIcon.Map} /></li>
                        <li>
                            <FormControl className={"material-selectbox"}>
                                <InputLabel htmlFor="age-native-helper">Tüm Kategoriler</InputLabel>
                                <NativeSelect>
                                    <option aria-label="None" value="" />
                                    <option value={10}>Ten</option>
                                    <option value={20}>Twenty</option>
                                    <option value={30}>Thirty</option>
                                </NativeSelect>

                            </FormControl>
                        </li>
                        <li className="buttons"><IconButtonLabel className="col" text="Ara" icon={AwesomeIcon.Search} /></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;