import React from 'react';
import classes from "./TextInput.module.css";

const TextInput = (props) => {
    return (
        <input className={classes.textInput} {...props}/>

    );
};

export default TextInput;