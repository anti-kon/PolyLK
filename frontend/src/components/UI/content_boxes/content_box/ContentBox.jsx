import React from 'react';
import classes from "./ContentBox.module.css";

const ContentBox = ({children, ...props}) => {
    return (
        <div className={classes.contentBox} {...props}>
            {children}
        </div>
    );
};

export default ContentBox;