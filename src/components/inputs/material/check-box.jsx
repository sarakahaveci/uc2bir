// @ts-nocheck
import React from 'react';
import {default as MaterialCheckbox} from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const CheckBox = ({className="", position="left", variant="primary", label, checked=false, onChange=() => {}}) => {
    return (
        <>
            <FormControl className="materials" component="fieldset">
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        className={`material-check-box ${className}`}
                        value={position}
                        control={<MaterialCheckbox color={variant} checked={checked} onChange={onChange} />}
                        label={label}
                    />
                </FormGroup>
            </FormControl>
        </>
    );
};

export default CheckBox;