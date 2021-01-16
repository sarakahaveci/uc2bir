import React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../components/typography/title';
import DefBackground from '../../statics/background';
import Svg from '../../statics/svg';

const Categories = (props) => {
    return (
        <section className={`categories ${props.className}`}>
            {props.background && <div className="backgorund-element" style={{ backgroundImage: `url(${DefBackground.elementBackground})`}}></div>}
            <Container>
                <Title variant="h5" component="h2">
                    Tarzını Seç, Hemen Kategorilere Göz At
                </Title>
                <ul>{Svg.Categories.map((val, key) => <li className="col-6 col-xl col-lg-2 col-md-3 col-sm-4" key={key}><a title={val.name} href={val.link}>{val.svg({ className: "category-svg" })} <span>{val.name}</span></a></li>)}</ul>
                {props.children}
            </Container>
        </section>
    );
};

export default Categories;