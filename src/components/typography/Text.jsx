import React, { useLayoutEffect, useState } from 'react';

const Text = ({className="", dark=false, gray=false, blue=false, style={}, children, fontSize="14pt", fontWeight="normal"}) => {
    const [color, setColor] = useState("#000000");

    useLayoutEffect(() => {
        if(dark) setColor("#1A1818");
        if(gray) setColor("#909090");
        if(blue) setColor("#00B2A9");
    },[color]);

    return (
        <div className={`typography text ${fontWeight} ${className}`} style={{...style, color, fontSize}}>
            {children}
        </div>
    );
};

export default Text;