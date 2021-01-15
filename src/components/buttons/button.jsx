import React, { useLayoutEffect, useState } from 'react';
import { Button as BaseButton } from 'react-bootstrap';

const Button = ({className="", onClick=null, text, children=null, dark=false, gray=false, blue=false, style={}, variant="", type=""}) => {
    const [buttonClass, setButtonClass] = useState("variant");
    useLayoutEffect(() => {
        if(dark) setButtonClass("dark");
        if(gray) setButtonClass("gray");
        if(blue) setButtonClass("blue");
    }, [buttonClass]);

    return (
        <BaseButton variant={variant} onClick={onClick} className={`${buttonClass} ${className}`} style={style} type={type}>
            {text}
            {children}
        </BaseButton>
    );
};

export default Button;