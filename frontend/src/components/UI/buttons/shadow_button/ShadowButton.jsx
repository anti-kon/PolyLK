import React from 'react';
import classes from "../shadow_button/ShadowButton.module.css";

const ShadowButton = ({children, ...props}) => {
    return (
        <button className={classes.shadowButton} {...props}>
            {children}
        </button>
    );
};

export default ShadowButton;