import React from 'react';
import TextField from "./text-field";
import CheckBox from "./check-box";
import {default as MCheckBox} from "./m-check-box";

export const Material = {
    TextField,
    CheckBox,

    email: props => <TextField {...props}/>,
    date: props => <TextField {...props}/>,
    password: props => <TextField {...props}/>,
    text: props => <TextField {...props}/>,

    checkbox: props => <CheckBox {...props}/>,
    mcheckbox: props => <MCheckBox {...props}/>,
}