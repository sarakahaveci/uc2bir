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
                        <Text style={{ letterSpacing: 5, marginBottom: 15 }} fontFamily="'Montserrat', sans-serif" children="BAŞARMAK İÇİN BAŞLA!" trunge />
                        <Text style={{ marginBottom: 10, lineHeight: "100%" }} fontFamily="'Bebas Neue', cursive" fontSize="2em" children="HER AN HER YERDE İSTEDİĞİN GİBİ ANTRENMAN YAP" softDark />
                        <Text style={{ marginBottom: 0 }} fontFamily="'Montserrat', sans-serif" fontSize="10pt" children="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." />
                    </div>
                </div>
            </section>
            <section className="col-12 col-xl-6 page login-page-widget">
                <div className="row">
                    <div className="page-content">
                        <div className="contain">
                            <RegisterStep />
                            <Text style={{ marginTop: 30, marginBottom: 10 }} fontSize="12pt" gray textAlign="center">
                                Hesabınız var mı? <Link to="/login">Giriş Yap</Link>
                            </Text>
                            <div className="identfy">
                                <span>Veya</span>
                            </div>
                            <div className="d-flex login-footer-start">
                                <div className="col"><IconButtonLabel style={{ fontSize: "9pt", height: 45 }} icon={AwesomeIcon.Google} text="Google ile giriş yap" dark /></div>
                                <div className="col"><IconButtonLabel style={{ fontSize: "9pt", height: 45 }} icon={AwesomeIcon.Facebook} text="Facebook ile giriş yap" dark /></div>
                            </div>
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