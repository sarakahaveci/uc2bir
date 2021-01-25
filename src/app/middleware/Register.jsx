// @ts-nocheck
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Material } from '../../components/inputs/material';

// @ts-ignore
import background from '../../statics/background/images/login.jpg';
import AwesomeIcon from '../../statics/icon';
import Button from '../../components/buttons/button';
import Title from '../../components/typography/title';
import Text from '../../components/typography/Text';
import IconButtonLabel from '../../components/buttons/icon-button-label';
import { Link } from "gatsby";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import RegisterStep from './register-step';
import FormPages from '../../components/FormPages';

const Register = (props) => {
    return (
        <FormPages>
            <section className="col-12 col-xl-6 page-info">
                <div className="row page-info-row">
                    <div className="ballon">
                        <Text style={{ letterSpacing: 5, marginBottom: 15 }} fontFamily="'Montserrat', sans-serif" children="321 ve Yeni Bir Sen!" trunge />
                        <Text style={{ marginBottom: 10, lineHeight: "100%" }} fontFamily="'Bebas Neue', cursive" fontSize="2em" children="HER AN HER YERDE" softDark />
                        <Text style={{ marginBottom: 0 }} fontFamily="'Montserrat', sans-serif" fontSize="10pt" children="Hedeflerine uygun antrenman planları ile İçindeki atleti özgür bırak" />
                    </div>
                </div>
            </section>
            <section className="col-12 col-xl-6 page login-page-widget">
                <div className="row">
                    <div className="page-content">
                        <div className="contain">
                            <RegisterStep />
                        </div>
                    </div>
                </div>
            </section>
        </FormPages>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({},),
    }
}

const mapStateToProps = ({ }) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Register);