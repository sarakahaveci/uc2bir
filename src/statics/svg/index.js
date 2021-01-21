// @ts-nocheck
import React from 'react';
// @ts-ignore
import { ReactComponent as I1 } from './images/pt.svg';
// @ts-ignore
import { ReactComponent as I2 } from './images/pt.svg';
// @ts-ignore
import { ReactComponent as I3 } from './images/pt.svg';
// @ts-ignore
import { ReactComponent as I4 } from './images/pt.svg';
// @ts-ignore
import { ReactComponent as I5 } from './images/pt.svg';
// @ts-ignore
import { ReactComponent as I6 } from './images/pt.svg';
// @ts-ignore
import { ReactComponent as I7 } from './images/pt.svg';
// @ts-ignore
import { ReactComponent as I8 } from './images/pt.svg';
// @ts-ignore
import { ReactComponent as I9 } from './images/pt.svg';

// @ts-ignore
import { ReactComponent as Menu } from './images/menu.svg';
// @ts-ignore
import { ReactComponent as Search } from './images/search.svg';

const Svg = {
    I1: props => <I1 {...props}/>,
    Menu: props => <Menu {...props}/>,
    Search: props => <Search {...props}/>,
    Categories: [
        {
            name: "PT",
            svg: props => <I1 {...props}/>
        },
        {
            name: "PT",
            svg: props => <I2 {...props}/>
        },
        {
            name: "PT",
            svg: props => <I3 {...props}/>
        },
        {
            name: "PT",
            svg: props => <I4 {...props}/>
        },
        {
            name: "PT",
            svg: props => <I5 {...props}/>
        },
        {
            name: "PT",
            svg: props => <I6 {...props}/>
        },
        {
            name: "PT",
            svg: props => <I7 {...props}/>
        },
    ]
}

export default Svg;