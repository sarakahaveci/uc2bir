import React, { useLayoutEffect, useState } from 'react';
import { Button as BaseButton } from 'react-bootstrap';

const PersPectiveButton = ({className="", onClick=null, text, children=null, dark=false, gray=false, blue=false, style={}, variant=""}) => {
    const [buttonClass, setButtonClass] = useState("variant");
    useLayoutEffect(() => {
        if(dark) setButtonClass("dark");
        if(gray) setButtonClass("gray");
        if(blue) setButtonClass("blue");
    }, [buttonClass]);

    return (
        <BaseButton variant={variant} onClick={onClick} className={`perspective-button ${buttonClass} ${className}`} style={style}>
            {text}
            {children}
        </BaseButton>
    );
};

export default PersPectiveButton;