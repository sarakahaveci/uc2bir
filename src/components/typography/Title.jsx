import React from 'react';
import Typography from '@material-ui/core/Typography';

const Title = ({className="", variant, component, gutterBottom=false, children, lineDisable=false, textLeft=false, textRight=false, fontWeight="bold"}) => {
    return (
        <Typography className={`
            typography 
            title 
            ${fontWeight} 
            ${className} 
            ${lineDisable ? "" : "line"} 
            ${!textLeft ? "" : "text-left"} 
            ${!textRight ? "" : "text-right"}`} 
            variant={variant} 
            component={component} 
            gutterBottom>
            {children}
        </Typography>
    );
};

export default Title;