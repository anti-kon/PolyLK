import React, {useState} from 'react';
import {BiHide, BiShow} from "react-icons/bi";
import classes from "./PasswordInput.module.css";

const PasswordInput = ({children, placeholder, ...props}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [value, setValue] = useState("");

    const eyeIcon = {width: "auto", height: "20px"}

    return (
        <div className={classes.passwordInput}>
            { (value === "") && <label className={classes.passwordInputPlaceholder}>{placeholder}</label> }
            <input
                className={classes.passwordInputField}
                value={value}
                onChange={e => {setValue(e.target.value)}}
                type={isVisible ? "text" : "password"}
                {...props}>
                {children}
            </input>
            <button
                onClick={() => {setIsVisible(!isVisible);}}
                className={classes.changeVisibilityButton}>
                {!isVisible ?
                    <BiShow style={eyeIcon}/> :
                    <BiHide style={eyeIcon}/>}
            </button>
        </div>
    );
};

export default PasswordInput;