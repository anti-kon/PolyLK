import React, {useState} from 'react';
import classes from "./TextInput.module.css";

const TextInput = ({valid, ...props}) => {
    return (
        <input
            {...props}
            className={valid ? classes.textInput : classes.textInputError}/>
    );
};

export default TextInput;