import React, {useEffect, useRef, useState} from 'react';
import classes from "./RadioInput.module.css";

const RadioInput = ({children, onChange, checked, ...props}) => {
    const [isActive, setIsActive] = useState(checked);

    useEffect(() => {setIsActive(checked)}, [checked])

    return (
        <div
            className={isActive ? classes.radioInputActive : classes.radioInputInactive}
            onClick={e => {onChange(props.value);}}>
            <input
                checked={checked}
                onChange={onChange}
                type={'radio'}
                {...props}/>
            <label>{children}</label>
        </div>
    );
};

export default RadioInput;