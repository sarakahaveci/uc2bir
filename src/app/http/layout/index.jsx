// @ts-nocheck
import React, { useLayoutEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../../../style/main.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import env from '../../../env';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProfile, refreshToken } from '../../../redux/reducers/login';

import FormData from 'form-data';

/**
 * @param {{ children: void; }} props
 */
const Layout = props => {
    const { getProfile, loginReducers, refreshToken } = props;
    const [ref, setRef] = useState(false);

    const removeKit = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_id');

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('user_id');
    }

    const refToken = async () => {
        const data = new FormData();
        data.append("refresh_token", env.refresh_token);

        const post = await refreshToken(data);
        const response = new Promise((resolve, reject) => {
            if ( post ) {
                resolve(post);
            } else {
                removeKit();
                reject("Lütfen tekrar giriş yapın.");
            }
        });

        return response
            .then((data) => {
                console.log(data);
                if ( data.type === "FETCH_ERROR" ) {
                    return removeKit();
                }
            })
            .then(() => setRef(true))
            .catch(err => toast.error(err, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }));
    }

    const profile = async () => {
        const get = await getProfile();
        const response = new Promise((resolve, reject) => {
            if ( get ) {
                resolve(get);
            } else {
                reject("Lütfen tekrar giriş yapın.");
            }
        });
        return response.then((data) => console.log(data))
            .then(() => setRef(true))
            .catch(err => toast.error(err, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }));
    }

    useLayoutEffect(() => {
        if ( env.token ) {
            if ( !ref ) {
                profile();
            }
        }
    }, [ref]);
    return (
        <div id="pt-point-page">
            <Header />
            {props.children}
            <Footer />
            <ToastContainer autoClose={2000} />
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({ getProfile, refreshToken }, dispatch),
    }
}

const mapStateToProps = ({ loginReducers }) => ({ loginReducers });

export default connect(mapStateToProps, mapDispatchToProps)(Layout);