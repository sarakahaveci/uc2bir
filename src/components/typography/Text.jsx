// @ts-nocheck
import React, { useLayoutEffect, useState } from 'react';

const Text = ({className="", white=false, dark=false, gray=false, blue=false, style={}, children, fontSize="14pt", fontWeight="normal", textAlign="left"}) => {
    const [color, setColor] = useState("#000000");

    useLayoutEffect(() => {
        if(dark) setColor("#1A1818");
        if(gray) setColor("#909090");
        if(blue) setColor("#00B2A9");
        if(white) setColor("#fff");
    },[color]);

    return (
        <div className={`typography text ${fontWeight} ${className}`} style={{...style, color, fontSize, textAlign}}>
            {children}
        </div>
    );
};

export default Text;