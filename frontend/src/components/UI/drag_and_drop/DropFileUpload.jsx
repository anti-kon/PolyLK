import React from 'react';
import classes from './DropFileUpload.module.css'

const DropFileUpload = ({children, onLoad, onDrop, ...props}) => {
    const inputRef = React.useRef(null);

    function handleFile(files) {
        onLoad(files);
    }
    const handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0])
            handleFile(e.dataTransfer.files);
        onDrop(e);
    };
    const handleChange = function(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0])
            handleFile(e.target.files);
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <div
            className={classes.dropFileBody}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onSubmit={(e) => e.preventDefault()}
            onClick={onButtonClick}
            {...props}>
            <input ref={inputRef}
                   type="file"
                   multiple={false}
                   onChange={handleChange}
                   accept="application/pdf"/>
            {children}
        </div>
    );
};

export default DropFileUpload;