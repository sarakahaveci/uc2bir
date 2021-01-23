// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { Material } from '../../../components/inputs/material';
import Button from '../../../components/buttons/button';
import { toast } from 'react-toastify';

import { macro } from '../../../redux/reducers/register-step-2/initial';
import { inputs } from '../../../redux/reducers/register-step-2/initial';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { register_step_two } from '../../../redux/reducers/register-step-2';

import FormData from 'form-data';

const StepThree = (props) => {
    const { register_step_two, registerStepTwo, setSteps } = props;
    const [data, setData] = useState({ ...inputs });
    const Fdata = new FormData();

    const onSubmit = async (event) => {
        event.preventDefault();

        for (const [key, val] of Object.entries(data)) {
            Fdata.append(key, val)
        }

        return console.log(data);
    }
    return (
        <form onSubmit={onSubmit} autoComplete="off">
            {macro.map((val, key) => {
                return (
                    <div style={{ width: "100%" }} key={key}>
                        {val.type === "radio" ? 
                        Material[val.type]({
                            id: val.name,
                            name: val.name,
                            type: val.type,
                            label: val.text,
                            required: val.required,
                            onChange: e => setData({ ...data, [e.target.name]: e.target.value }),
                            autoComplete: "off",
                            items: val.items ? val.items : [],
                        }) : (val.type === "select") ?
                            Material[val.type]({
                                id: val.name,
                                name: val.name,
                                type: val.type,
                                label: val.text,
                                required: val.required,
                                onChange: e => setData({ ...data, [e.target.name]: e.target.value }),
                                autoComplete: "off",
                                icon: val.icon,
                                items: val.items ? val.items : [],
                            }) : (val.type !== "checkbox") ?
                                Material[val.type]({
                                    id: val.name,
                                    name: val.name,
                                    type: val.type,
                                    label: val.text,
                                    required: val.required,
                                    onChange: e => setData({ ...data, [e.target.name]: e.target.value }),
                                    autoComplete: "off",
                                    icon: val.icon,
                                }) :
                                Material[val.type]({
                                    id: val.name,
                                    name: val.name,
                                    required: val.required,
                                    type: val.type,
                                    label: val.text,
                                    onChange: e => setData({ ...data, [val.name]: e.target.checked ? 1 : 0 }),
                                    checked: data[val.name] ? true : false,
                                })
                            }
                    </div>
                );
            })}
            <div style={{marginTop: 30, marginBottom: 15}}>
            {!registerStepTwo.loading ?
                <Button type="submit" text={`İleri`} blue /> :
                <Button onClick={async () => {
                    console.log("Lütfen Bekleyiniz...")
                }} text={`Yükleniyor...`} blue />
            }
            </div>
        </form>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({ register_step_two }, dispatch),
    }
}

const mapStateToProps = ({ registerStepTwo }) => ({ registerStepTwo });

export default connect(mapStateToProps, mapDispatchToProps)(StepThree);