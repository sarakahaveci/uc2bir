// @ts-nocheck
import React from 'react';

const InputText = ({className="", labelText, labelName, inputName, inputVal="", required=false, inputType="text"}) => {
    return (
        <div className={`component-inputs form-groups ${className}`}>
            <label className="label" htmlFor={labelName}>{labelText}</label>
            <input
                required={required}
                type={inputType}
                name={inputName}
                value={inputVal}
                onChange={e => console.log(e)}
                className="form-control"/>
            <small style={{display: "none"}} className="error hidden form-text">Lütfen {labelText} Giriniz!</small>
        </div>
    );
};

export default InputText;