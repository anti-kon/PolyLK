import React from 'react';
import {BiShow} from "react-icons/bi";
import classes from "./ButtonTextInput.module.css";

const ButtonTextInput = ({buttonSvg, ...props}) => {
    return (
        <div className={classes.buttonTextInput}>
            <input type={"text"} {...props}/>
            {buttonSvg !== undefined &&
                <button>{buttonSvg}</button>
            }
        </div>
    );
};

export default ButtonTextInput;