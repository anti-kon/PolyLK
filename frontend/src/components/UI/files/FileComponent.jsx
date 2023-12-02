import React from 'react';
import {BiFileBlank} from "react-icons/bi";
import classes from "./FileComponent.module.css";

const FileComponent = ({children}) => {
    return (
        <div className={classes.fileComponent}>
            <div className={classes.iconBox}><BiFileBlank className={classes.fileIcon} /></div>
            <label className={classes.fileName}>{children}</label>
        </div>
    );
};

export default FileComponent;