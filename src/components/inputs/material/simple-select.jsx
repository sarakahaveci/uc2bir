// @ts-nocheck
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: 0,
        minWidth: 120,
        width: "100%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const SimpleSelect = ({ id, name, label, type, items = [], required = false, defaultValue = "", autoComplete = "on", className = "", icon = false, onChange = () => { }, value = "", onKeyUp = () => { }, maxLength = "" }) => {
    const classes = useStyles();
    const [val, setVal] = useState(defaultValue);

    const handleChange = (event, callback) => {
        setVal(event.target.value);
        return callback(event);
    };
    return (
        <div className={`materials select-materials ${icon ? "has-icon" : ""}`}>
            <FormControl className={classes.formControl}>
                {icon && icon({ className: "material-inputs-icon" })}
                <InputLabel>{label}</InputLabel>
                <Select
                    labelId={name}
                    id={name}
                    name={name}
                    value={val}
                    onChange={e => handleChange(e, onChange)}
                    required={required}
                >
                    {items.map((val, key) => <MenuItem key={`select-${name}-${key}`} value={val.val}>{val.text}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    );
}

export default SimpleSelect;