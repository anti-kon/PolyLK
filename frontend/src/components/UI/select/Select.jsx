import React, {useEffect, useRef, useState} from 'react';
import classes from "./Select.module.css";
import {BiSolidDownArrow} from "react-icons/bi";

const Select = ({valid = true, default_value_number='', default_value = "", ...props}) => {
    const [isListVisible,setIsListVisible] = useState(false);
    const [value, setValue] = useState(default_value);

    const ref = useRef(null)

    const handleBlur = (e) => {
        const currentTarget = e.currentTarget;

        requestAnimationFrame(() => {
            setIsListVisible(currentTarget.contains(document.activeElement))
        });
    };

    return (
        <div
            className={classes.selectWrapper}
            onClick={() => ref.current.focus()}
            onFocus={() => {setIsListVisible(true); ref.current.focus()}}>
            {
                isListVisible &&
                <div {...props} className={valid ? classes.selectBody : classes.selectBodyError}>
                    {value === "" ? props.placeholder : <label className={classes.selectValue}>{value}</label>}
                        <BiSolidDownArrow className={valid ? classes.selectArrow : classes.selectArrowError}/>
                </div>
            }
            <div className={isListVisible ? valid ? classes.selectListModal : classes.selectListModalError :
                                            valid ? classes.selectBody : classes.selectBodyError}>
                {!isListVisible &&
                        <BiSolidDownArrow className={valid ? classes.selectArrow : classes.selectArrowError}/>
                }
                <select
                    ref={ref}
                    onBlur={handleBlur}
                    onClick={() => console.log(2)}
                    size={isListVisible ? 6 : 1}
                    className={valid ? classes.selectList : classes.selectListError}
                    style={value === "" ? valid ? {color: "#96bfbf"} :{color: "#cc7e7e"} : {}}
                    onChange={e => {
                        setIsListVisible(false);
                        ref.current.blur()
                        setValue(e.target.options[e.target.selectedIndex].text);
                        props.onChange !== undefined && props.onChange(e);
                    }}>
                    <option className={valid ? classes.placeholder : classes.placeholderError}
                            disabled selected value style={{display: 'none'}}>Общежитие №</option>
                    {props.options.map(option =>
                        <option
                            key={option.key}
                            className={classes.selectOption}
                            value={option.value}>{option.name}</option>
                    )}
                </select>
            </div>
        </div>
    );
};

export default Select;