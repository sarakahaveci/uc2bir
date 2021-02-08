// @ts-nocheck
import React, {useLayoutEffect, useState} from 'react';

import { Container } from 'react-bootstrap';

import background from './statics/background/images/login.jpg';

const FormPages = ({children=""}) => {
    const [windowSize, setWindowSize] = useState(false);
    useLayoutEffect(() => {
        window.addEventListener('resize', () => setWindowSize(window.innerWidth));

        const page = window.innerWidth;
        const height = window.innerHeight;

        if (!windowSize) {
            setWindowSize(page);
        }

        const container = document.querySelector(".login-widget");
        const col = document.querySelector(".login-page-widget");
        const el = document.querySelector(".login-fluid-img");

        if ( windowSize > 1200 ) {
            const size = ((windowSize - container.offsetWidth) / 2) + col.offsetWidth;
            el.style.width = `${size}px`;
        } else {
            el.style.width = "100%";
        }
    },[windowSize]);
    return (
        <section className="login">
            <Container className="login-widget">
                <div className="row justify-content-end">
                    <div className="fluid-img login-fluid-img">
                        <div className="img" style={{ backgroundImage: `url(${background})` }}></div>
                    </div>
                    {children}
                </div>
            </Container>
        </section>
    );
};

export default FormPages;