import React, { useLayoutEffect, useState } from 'react';

const IconLabel = ({href, className, text, icon, onClick=null, style={}}) => {
    return (
        <a href={href} target="_blank" className={`icon-button ${className}`} onClick={onClick} style={style}>
            {icon && icon({className: "icon"})}
            <span>{text}</span>
        </a>
    )
}

export default IconLabel;
