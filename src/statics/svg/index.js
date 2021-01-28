// @ts-nocheck
import React from 'react';
import { ReactSVG } from 'react-svg';

//import svg
import { ReactComponent as Menu } from './images/menu.svg';
import { ReactComponent as Search } from './images/search.svg';

//import resct svg
import InfoHome from './images/info-home.svg';
import InfoOnline from './images/info-online.svg';
import InfoSport from './images/info-sport.svg';

//categories
import I1 from './images/pt.svg';
import I2 from './images/fitness.svg';
import I3 from './images/tennis.svg';
import I4 from './images/yoga.svg';
import I5 from './images/kick-boks.svg';
import I6 from './images/athletic-performance.svg';
import I7 from './images/swimming.svg';

const Svg = {
    Menu: props => <Menu {...props}/>,
    Search: props => <Search {...props}/>,

    InfoHome: props => <ReactSVG {...props} src={InfoHome}/>,
    InfoOnline: props => <ReactSVG {...props} src={InfoOnline}/>,
    InfoSport: props => <ReactSVG {...props} src={InfoSport}/>,

    Categories: [
        {
            name: "Body Builder",
            svg: props => <ReactSVG {...props} src={I1} />
        },
        {
            name: "Fitness",
            svg: props => <ReactSVG {...props} src={I2} />
        },
        {
            name: "Tenis",
            svg: props => <ReactSVG {...props} src={I3} />
        },
        {
            name: "Yoga",
            svg: props => <ReactSVG {...props} src={I4} />
        },
        {
            name: "Kick Boks",
            svg: props => <ReactSVG {...props} src={I5} />
        },
        {
            name: "Athlet",
            svg: props => <ReactSVG {...props} src={I6} />
        },
        {
            name: "Yüzücülük",
            svg: props => <ReactSVG {...props} src={I7} />
        },
    ]
}

export default Svg;