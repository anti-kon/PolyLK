import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {BiHide, BiShow} from "react-icons/bi";
import classes from "./PasswordInput.module.css";

const PasswordInput = ({children = "", style = null, placeholder, onChange, valid, ...props}) => {
    const ref = useRef(null);

    const [height, setHeight] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [value, setValue] = useState("");

    useLayoutEffect(() => {
        setHeight(ref.current.clientHeight);
        setValue(children);
    }, []);

    useEffect(() => {
        function handleWindowResize() {
            setHeight(ref.current.clientHeight);
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const eyeIcon = {width: "auto", height: height * 0.7}

    return (
        <div ref={ref} style={style}
             className={valid ? classes.passwordInput : classes.passwordInputError}>
            {
                (value === "") &&
                <label
                    style={{fontSize: style.fontSize}}
                    className={valid ? classes.passwordInputPlaceholder : classes.passwordInputPlaceholderError}>
                    {placeholder}
                </label>
        }
            <input
                style={{fontSize: style.fontSize}}
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
