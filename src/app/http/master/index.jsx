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

import axios from 'axios';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProfile } from '../../../redux/reducers/login';

/**
 * @param {{ children: void; }} props
 */
const Master = props => {
    const { getProfile, loginReducers } = props;
    const [ref, setRef] = useState(false);

    const refToken = async () => {
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
                refToken();
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
        ...bindActionCreators({ getProfile }, dispatch),
    }
}

const mapStateToProps = ({ loginReducers }) => ({ loginReducers });

export default connect(mapStateToProps, mapDispatchToProps)(Master);