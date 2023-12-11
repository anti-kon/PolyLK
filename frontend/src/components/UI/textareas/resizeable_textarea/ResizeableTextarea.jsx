import React, {useEffect, useRef, useState} from 'react';
import classes from "./ResizeableTextarea.module.css";

const ResizeableTextarea = ({...props}) => {
    const [val, setVal] = useState('');
    const textAreaRef = useRef(null);

    const resizeTextArea = () => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    };

    useEffect(resizeTextArea, [val]);

    const onChange = e => {
        setVal(e.target.value);
    };

    return (
        <textarea
            className={classes.resizeableTextarea}
            ref={textAreaRef}
            value={val}
            onChange={onChange}
            rows={1}
            {...props}/>
    );
};

export default ResizeableTextarea;