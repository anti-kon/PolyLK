import React from 'react';
import {BiFileBlank} from "react-icons/bi";
import classes from "./FileComponent.module.css";


const FileComponent = ({children, url}) => {
    const download = () => {
        const link = document.createElement('a');
        link.download = children;
        link.href = url;
        link.click();
    }

    return (
        <div className={classes.fileComponent} onClick={download}>
            <div className={classes.iconBox}><BiFileBlank className={classes.fileIcon} /></div>
            <label className={classes.fileName}>{children}</label>
        </div>
    );
};

export default FileComponent;