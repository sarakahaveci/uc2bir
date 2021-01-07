import React, { useLayoutEffect, useState } from 'react';
import { Button as BaseButton } from 'react-bootstrap';

const LineButton = ({className="", onClick=null, text, children=null, dark=false, gray=false, blue=false, style={}}) => {
    const [buttonClass, setButtonClass] = useState("variant");
    useLayoutEffect(() => {
        if(dark) setButtonClass("dark");
        if(gray) setButtonClass("gray");
        if(blue) setButtonClass("blue");
    }, [buttonClass]);

    return (
        <BaseButton onClick={onClick} className={`btn-line ${buttonClass} ${className}`} style={style}>
            {text}
            {children}
        </BaseButton>
    );
};

export default LineButton;