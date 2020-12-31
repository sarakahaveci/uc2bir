import React, { useLayoutEffect, useState } from 'react';
import { Button as BaseButton } from 'react-bootstrap';

const Button = ({className, onClick=null, text, children=null, dark=false, gray=false, style={}}) => {
    const [buttonClass, setButtonClass] = useState("blue");
    useLayoutEffect(() => {
        if(dark) setButtonClass("dark");
        if(gray) setButtonClass("gray");
    }, [buttonClass]);

    return (
        <BaseButton onClick={onClick} className={`${buttonClass} ${className}`} style={style}>
            {text}
            {children}
        </BaseButton>
    );
};

export default Button;