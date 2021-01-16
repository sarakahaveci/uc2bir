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

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from '../../redux/reducers/login';

import FormData from 'form-data';
import { initialState, macro } from '../../redux/reducers/login/initial';

import { toast } from 'react-toastify';
import { navigate } from "gatsby";

const Login = (props) => {
    const [windowSize, setWindowSize] = useState(false);
    useLayoutEffect(() => {
        window.addEventListener('resize', () => setWindowSize(window.innerWidth));
        const page = window.innerWidth;
        if (!windowSize) {
            setWindowSize(page);
        }
        const container = document.querySelector(".login-widget").offsetWidth;
        const col = document.querySelector(".login-page-widget").offsetWidth;
        const el = document.querySelector(".login-fluid-img");

        if ( windowSize > 1200 ) {
            const size = ((windowSize - container) / 2) + col;
            el.style.width = `${size}px`;
        } else {
            el.style.width = "100%";
        }
    },[windowSize]);

    const { login, loginReducers } = props;
    const [lg, setLg] = useState({ ...initialState });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        const result = await login(data);
        setLg({
            ...initialState,
            loading: false,
            isSuccess: true,
            entity: result.payload,
        });
    }

    const data = new FormData();

    data.append('email', email);
    data.append('password', password);

    useEffect(() => {
        const session = new Promise((resolve, reject) => {
            const sessionAdd = () => {
                sessionStorage.setItem("token", lg.entity.token);
                sessionStorage.setItem("refresh_token", lg.entity.refresh_token);
                sessionStorage.setItem("user_id", lg.entity.user.id);
            }
            const localAdd = () => {
                localStorage.setItem("token", lg.entity.token);
                localStorage.setItem("refresh_token", lg.entity.refresh_token);
                localStorage.setItem("user_id", lg.entity.user.id);
            }
            if (lg.isSuccess) {
                if (lg.entity.token) {
                    if (!rememberMe)
                        sessionAdd();
                    else
                        localAdd();

                    resolve("Giriş Başarılı!");
                } else {
                    reject("Hatalı Giriş!");
                }
            }
        });

        session
            .then(data => toast.success(data, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }))
            .then(() => setTimeout(() => {
                toast.info("Lütfen Bekleyiniz! Yönlendiriliyorsunuz...", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }, 1000))
            .then(() => setTimeout(() => navigate("/"), 3050))
            .catch(err => toast.error(err, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }));
    }, [lg]);

    return (
        <section className="login">
            <Container className="login-widget">
                <div className="row justify-content-end">
                    <div className="fluid-img login-fluid-img">
                        <div className="img" style={{ backgroundImage: `url(${background})` }}></div>
                    </div>
                    <section className="col-12 col-xl-6 page login-page-widget">
                        <div className="row">
                            <div className="page-content">
                                <div className="contain">
                                    <Text style={{ letterSpacing: 5, marginBottom: 25 }} fontFamily="'Montserrat', sans-serif" children="321 VE YENİ BİR SEN!" trunge />
                                    <Text style={{ marginBottom: 10 }} fontFamily="'Bebas Neue', cursive" fontSize="2em" children="HER AN HER YERDE İSTEDİĞİN GİBİ ANTRENMAN YAP" softDark />
                                    <Text style={{ marginBottom: 40 }} fontFamily="'Montserrat', sans-serif" fontSize="10pt" children="Hedeflerine uygun antrenman planları ile İçindeki atleti özgür bırak" />
                                    <Title fontWeight="normal" style={{ marginBottom: 30 }} className="material-title" variant="h6" component="h6" children="Giriş Yap" dark lineDisable textLeft />

                                    <form onSubmit={onSubmit}>
                                        <Material.TextField required onChange={(e) => setEmail(e.target.value)} id="login-email" name="login-email" label="E mail veya Telefon" type="email" icon={AwesomeIcon.At} />
                                        <Material.TextField required onChange={(e) => setPassword(e.target.value)} id="login-password" name="login-password" label="Şifre" type="password" icon={AwesomeIcon.Lock} />
                                        <div style={{ paddingTop: "15px", paddingBottom: "0px", flexWrap: "nowrap" }} className="row justify-content-between">
                                            <div className="col-auto"><Material.CheckBox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} label="Beni Hatırla" /></div>
                                            <div className="col-auto remember-password"><a href="#">Şifremi Unuttum</a></div>
                                        </div>
                                        {!loginReducers.loading ?
                                            <Button type="submit" text={`Giriş Yap`} blue /> :
                                            <Button onClick={async () => {
                                                console.log("Lütfen Bekleyiniz...")
                                            }} text={`Yükleniyor...`} blue />
                                        }
                                        <Text style={{ marginTop: 30, marginBottom: 10 }} fontSize="12pt" gray textAlign="center">
                                            Hesabınız yok mu? <a href="#">Üye ol</a>
                                        </Text>
                                    </form>
                                    <div className="identfy">
                                        <span>Veya</span>
                                    </div>
                                    <div className="d-flex login-footer-start">
                                        <div className="col"><IconButtonLabel style={{ fontSize: "9pt", height: 45 }} icon={AwesomeIcon.Google} text="Google il giriş yap" dark /></div>
                                        <div className="col"><IconButtonLabel style={{ fontSize: "9pt", height: 45 }} icon={AwesomeIcon.Facebook} text="Facebook il giriş yap" dark /></div>
                                    </div>
                                    <a className="login-footer" href="#">Sistemimizde hizmet vermek için tıklayın</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Container>
        </section>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({ login }, dispatch),
    }
}

const mapStateToProps = ({ loginReducers }) => ({ loginReducers });

export default connect(mapStateToProps, mapDispatchToProps)(Login);