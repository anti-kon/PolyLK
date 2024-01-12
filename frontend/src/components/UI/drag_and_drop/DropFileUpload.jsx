import React from 'react';
import classes from './DropFileUpload.module.css'
import formData from 'form-data'
import axios from "axios";

const DropFileUpload = (props) => {
    const inputRef = React.useRef(null);

    function handleFile(files) {
        let data = new formData();
        data.append('file', files[0], files[0].name)
        console.log(data);
        console.log("1")
        axios.post('./test/', data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        })
            .then((response) => {
                //handle success
            }).catch((error) => {
            //handle error
        });
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
            onClick={onButtonClick}>
            <input ref={inputRef} type="file" multiple={true} onChange={handleChange} />
            {props.children}
        </div>
    );
};

export default DropFileUpload;