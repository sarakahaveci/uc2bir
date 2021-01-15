import React, {useLayoutEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';

const Title = ({white=false, dark=false, gray=false, blue=false, className="", variant, component, gutterBottom=false, children, lineDisable=false, textLeft=false, textRight=false, fontWeight="bold", style={}}) => {
    const [color, setColor] = useState("#000000");

    useLayoutEffect(() => {
        if(dark) setColor("#1A1818");
        if(gray) setColor("#909090");
        if(blue) setColor("#00B2A9");
        if(white) setColor("#fff");
    },[color]);

    return (
        <Typography className={`typography title ${fontWeight} ${className} ${lineDisable ? "" : "line"} ${!textLeft ? "" : "text-left"} ${!textRight ? "" : "text-right"}`}
            variant={variant}
            component={component}
            gutterBottom
            style={{...style, color}}>
            {children}
        </Typography>
    );
};

export default Title;