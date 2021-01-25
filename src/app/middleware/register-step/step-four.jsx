// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { Material } from '../../../components/inputs/material';
import Button from '../../../components/buttons/button';
import { toast } from 'react-toastify';

import { macro } from '../../../redux/reducers/quiz/initial';
import { inputs } from '../../../redux/reducers/quiz/initial';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { quiz_response } from '../../../redux/reducers/quiz';

import FormData from 'form-data';

const StepFour = (props) => {
    const { quiz_response, quiz, setSteps, loginReducers } = props;
    const [data, setData] = useState({ ...inputs });
    const Fdata = new FormData();

    const onSubmit = async (event) => {
        event.preventDefault();

        for (const [key, val] of Object.entries(data)) {
            Fdata.append(key, val)
        }

        const response = await quiz_response(data);
        if ( response.type !== "FETCH_ERROR_STEP_TWO" ) {
            toast.success("Cevaplar başarı ile kayıt edildi.", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
			toast.info("Lütfen Bekleyiniz! Yönlendiriliyorsunuz...", {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
            });
            return setTimeout(() => setSteps("finish"), 1200);
        } else {
            toast.error(response.payload, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
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
            {!quiz.loading ?
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
        ...bindActionCreators({ quiz_response }, dispatch),
    }
}

const mapStateToProps = ({ quiz, loginReducers }) => ({ quiz, loginReducers });

export default connect(mapStateToProps, mapDispatchToProps)(StepFour);