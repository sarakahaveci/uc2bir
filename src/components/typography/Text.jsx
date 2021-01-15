// @ts-nocheck
import React, { useLayoutEffect, useState } from 'react';

const Text = ({className="", white=false, dark=false, softDark=false, gray=false, blue=false, trunge=false, red=false, style={}, children, fontSize="14pt", fontFamily="'Poppins', sans-serif", fontWeight="normal", textAlign="left"}) => {
    const [color, setColor] = useState("#000000");

    useLayoutEffect(() => {
        if(dark) setColor("#1A1818");
        if(softDark) setColor("#1a1818");
        if(trunge) setColor("#ffba00");
        if(red) setColor("#f01c62");
        if(gray) setColor("#909090");
        if(blue) setColor("#00B2A9");
        if(white) setColor("#fff");
    },[color]);

    return (
        <div className={`typography text ${fontWeight} ${className}`} style={{...style, color, fontSize, textAlign, fontFamily}}>
            {children}
        </div>
    );
};

export default Text;