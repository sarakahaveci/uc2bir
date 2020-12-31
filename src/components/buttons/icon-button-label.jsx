import React from 'react';
import { Button } from 'react-bootstrap';

const IconButtonLabel = ({onClick=null, className, backgroundColor=null, icon, text}) => {
    return (
        <Button onClick={onClick} className={className} style={{backgroundColor}}>
            {icon && icon()}
            <span>{text}</span>
        </Button>
    );
};

export default IconButtonLabel;