import React, {useEffect, useRef, useState} from 'react';
import classes from "./ResizeableTextarea.module.css";

const ResizeableTextarea = ({onChange, ...props}) => {
    const [val, setVal] = useState('');
    const textAreaRef = useRef(null);

    const resizeTextArea = () => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    };

    useEffect(resizeTextArea, [val]);

    const onTextChange = e => {
        setVal(e.target.value);
        onChange(e);
    };

    return (
        <textarea
            className={classes.resizeableTextarea}
            ref={textAreaRef}
            value={val}
            onChange={onTextChange}
            rows={1}
            {...props}>
        </textarea>
    );
};

export default ResizeableTextarea;