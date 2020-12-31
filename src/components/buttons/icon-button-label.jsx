import React, { useLayoutEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const IconButtonLabel = ({onClick=null, className, style={}, icon, text, dark=false, gray=false}) => {
    const [buttonClass, setButtonClass] = useState("blue");
    useLayoutEffect(() => {
        if(dark) setButtonClass("dark");
        if(gray) setButtonClass("gray");
    }, [buttonClass]);

    return (
        <Button onClick={onClick} className={`${buttonClass} ${className}`} style={style}>
            {icon && icon({className: "icon"})}
            <span>{text}</span>
        </Button>
    );
};

export default IconButtonLabel;