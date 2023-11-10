import React from 'react';
import classes from "./TextInput.module.css";

const TextInput = (props) => {
    return (
        <input {...props} className={classes.textInput}/>
    );
};

export default TextInput;