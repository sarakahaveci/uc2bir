// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { Material } from '../../../components/inputs/material';
import Button from '../../../components/buttons/button';
import { toast } from 'react-toastify';

import { macro } from '../../../redux/reducers/register-step-1/initial';
import { inputs } from '../../../redux/reducers/register-step-1/initial';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { register_step_one } from '../../../redux/reducers/register-step-1';

import FormData from 'form-data';

const StepOne = (props) => {
    const { register_step_one, registerStepOne, setSteps } = props;
    const [data, setData] = useState({ ...inputs });
    const Fdata = new FormData();

    useEffect(() => {
        for (const [key, val] of Object.entries(data)) {
            Fdata.append(key, val)
        }
    }, [data]);

    const onSubmit = async (event) => {
        event.preventDefault();
        const result = await register_step_one(Fdata);
        if (result.type === "FETCH_ERROR") {
            toast.error(result.payload, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            return setSteps("step2");
        }
    }
    return (
        <form onSubmit={onSubmit} autoComplete="off">
            {macro.map((val, key) => {
                return (
                    <div style={{ width: "100%" }} key={key}>
                        {(val.type !== "checkbox") ?
                            Material[val.type]({
                                id: val.name,
                                name: val.name,
                                type: val.type,
                                label: val.text,
                                required: val.required,
                                onChange: e => setData({ ...data, [e.target.name]: e.target.value }),
                                autoComplete: "off",
                            }) :
                            Material[val.type]({
                                id: val.name,
                                name: val.name,
                                required: val.required,
                                type: val.type,
                                label: val.text,
                                onChange: e => setData({ ...data, [val.name]: e.target.checked ? 1 : 0 }),
                                checked: data[val.name] ? true : false,
                            })}
                    </div>
                );
            })}
            {!registerStepOne.loading ?
                <Button type="submit" text={`İleri`} blue /> :
                <Button onClick={async () => {
                    console.log("Lütfen Bekleyiniz...")
                }} text={`Yükleniyor...`} blue />
            }
        </form>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({ register_step_one }, dispatch),
    }
}

const mapStateToProps = ({ registerStepOne }) => ({ registerStepOne });

export default connect(mapStateToProps, mapDispatchToProps)(StepOne);