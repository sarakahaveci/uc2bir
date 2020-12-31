import React from 'react';

const IconLabel = ({href, className, text, icon, onClick=null}) => {
    return (
        <a href={href} target="_blank" className={className} onClick={onClick}>
            {icon && icon()}
            <span>{text}</span>
        </a>
    )
}

export default IconLabel;
