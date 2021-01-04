import React from 'react';
import Title from '../../components/typography/title';
import Svg from '../../statics/svg';

const Categories = (props) => {
    return (
        <section className={`categories ${props.className}`}>
            <Title variant="h5" component="h2">
                Tarzını Seç, Hemen Kategorilere Göz At
            </Title>
            <ul>{Svg.Categories.map((val, key) => <li key={key}><a title={val.name} href={val.link}>{val.svg({className: "category-svg"})} <span>{val.name}</span></a></li>)}</ul>
            {props.children}
        </section>
    );
};

export default Categories;