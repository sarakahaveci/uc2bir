import React from 'react';
import TextField from "./text-field";
import DateField from "./date-field";
import CheckBox from "./check-box";
import SimpleSelect from "./simple-select";
import {default as MCheckBox} from "./m-check-box";

export const Material = {
    TextField,
    CheckBox,

    email: props => <TextField {...props}/>,
    date: props => <DateField {...props}/>,
    password: props => <TextField {...props}/>,
    text: props => <TextField {...props}/>,
    select: props => <SimpleSelect {...props}/>,

    checkbox: props => <CheckBox {...props}/>,
    mcheckbox: props => <MCheckBox {...props}/>,
}