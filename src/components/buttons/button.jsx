import React from 'react';
import { Button as BaseButton } from 'react-bootstrap';

const Button = ({className, onClick=null, text, children=null}) => {
    return (
        <BaseButton onClick={onClick} className={className}>
            {text}
            {children}
        </BaseButton>
    );
};

export default Button;