import React from 'react';
import { Button as BaseButton } from 'react-bootstrap';

const BgSoftButton = ({className="", onClick=null, text, children=null, style={}}) => {
    return (
        <BaseButton onClick={onClick} className={`bg-soft-button ${className}`} style={style}>
            {text}
            {children}
        </BaseButton>
    );
};

export default BgSoftButton;