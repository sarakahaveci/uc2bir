import React from 'react';
import TextField from "./text-field";
import DateField from "./date-field";
import CheckBox from "./check-box";
import SimpleSelect from "./simple-select";
import RadioButtonsGroup from "./radio-button-groups";
import {default as MCheckBox} from "./m-check-box";

export const Material = {
    TextField,
    CheckBox,
    SimpleSelect,
    MCheckBox,
    RadioButtonsGroup,

    email: props => <TextField {...props}/>,
    number: props => <TextField {...props}/>,
    date: props => <DateField {...props}/>,
    password: props => <TextField {...props}/>,
    text: props => <TextField {...props}/>,
    hidden: props => <TextField {...props}/>,
    select: props => <SimpleSelect {...props}/>,
    radio: props => <RadioButtonsGroup {...props}/>,

    checkbox: props => <CheckBox {...props}/>,
    mcheckbox: props => <MCheckBox {...props}/>,
}