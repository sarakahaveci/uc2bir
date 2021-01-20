// @ts-nocheck
import React from 'react';

const InputText = ({className="", labelText, labelName, inputName, inputVal="", required=false, inputType="text", ref="", onKeyUp=() => {}, onChange=() => {}, maxLength=""}) => {
    return (
        <div className={`component-inputs form-groups ${className}`}>
            <label className="label" htmlFor={labelName}>{labelText}</label>
            <input
                required={required}
                type={inputType}
                name={inputName}
                value={inputVal}
                onChange={onChange}
                className="form-control"
				maxLength={maxLength}
				onKeyUp={onKeyUp}/>
            <small style={{display: "none"}} className="error hidden form-text">Lütfen {labelText} Giriniz!</small>
        </div>
    );
};

export default InputText;