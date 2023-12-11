import React, {useState} from 'react';
import classes from "./Seletc.module.css";

const Select = ({...props}) => {
    return (

        <select {...props} className = {classes.select}>
            <option value={""} disabled selected hidden > {props.placeholder} </option>
            {props.options.map(option =>
                <option value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default Select;