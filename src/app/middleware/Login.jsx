// @ts-nocheck
import React, { useEffect, useState } from 'react';
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
import { initialState } from '../../redux/reducers/login/initial';

import { toast } from 'react-toastify';
import { navigate } from "gatsby";

const Login = (props) => {
    const { login, loginReducers } = props;
    const [lg, setLg] = useState({...initialState});
    const data = new FormData();

    data.append('email', 'omer_dogan@outlook.com');
    data.append('password', '123456');

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
            if ( lg.isSuccess ) {
                if ( lg.entity.token ) {
                    sessionAdd();
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
            <Container>
                <div className="row justify-content-end">
                    <div className="fluid-img">
                        <div className="img" style={{ backgroundImage: `url(${background})` }}></div>
                    </div>
                    <section className="col-lg-6 page">
                        <div className="row">
                            <div className="page-content">
                                <div className="contain">
                                    <Text style={{ letterSpacing: 5, marginBottom: 25 }} fontFamily="'Montserrat', sans-serif" children="321 VE YENİ BİR SEN!" trunge />
                                    <Text style={{ marginBottom: 10 }} fontFamily="'Bebas Neue', cursive" fontSize="2em" children="HER AN HER YERDE İSTEDİĞİN GİBİ ANTRENMAN YAP" softDark />
                                    <Text style={{ marginBottom: 40 }} fontFamily="'Montserrat', sans-serif" fontSize="10pt" children="Hedeflerine uygun antrenman planları ile İçindeki atleti özgür bırak" />
                                    <Title fontWeight="normal" style={{ marginBottom: 30 }} className="material-title" variant="h6" component="h6" children="Giriş Yap" dark lineDisable textLeft />
                                    <Material.TextField id="login-email" name="login-email" label="E mail veya Telefon" type="text" icon={AwesomeIcon.At} />
                                    <Material.TextField id="login-password" name="login-password" label="Şifre" type="password" icon={AwesomeIcon.Lock} />
                                    <div style={{ paddingTop: "15px", paddingBottom: "0px" }} className="row justify-content-between">
                                        <div className="col-auto"><Material.CheckBox label="Beni Hatırla" /></div>
                                        <div className="col-auto remember-password"><a href="#">Şifremi Unuttum</a></div>
                                    </div>
                                    {!loginReducers.loading ? 
                                        <Button onClick={async () => {
                                            const result = await login(data);
                                            setLg({
                                                ...initialState,
                                                loading: false,
                                                isSuccess: true,
                                                entity: result.payload,
                                            });
                                        }} text={`Giriş Yap`} blue/> :
                                        <Button onClick={async () => {
                                            console.log("Lütfen Bekleyiniz...")
                                        }} text={`Yükleniyor...`} blue/>
                                    }
                                    <Text style={{ marginTop: 30, marginBottom: 10 }} fontSize="12pt" gray textAlign="center">
                                        Hesabınız yok mu? <a href="#">Üye ol</a>
                                    </Text>
                                    <div className="identfy">
                                        <span>Veya</span>
                                    </div>
                                    <div style={{ height: 45 }} className="row">
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