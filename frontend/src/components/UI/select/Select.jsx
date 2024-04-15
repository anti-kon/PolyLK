import React, {useRef, useState} from 'react';
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
            onFocus={() => {setIsListVisible(true); ref.current.focus()}}>
            {
                isListVisible &&
                <div {...props} className={valid ? classes.selectBody : classes.selectBodyError}>
                    {value === "" ? props.placeholder : <label className={classes.selectValue}>{value}</label>}
                    <button className={classes.selectClick}>
                        <BiSolidDownArrow className={valid ? classes.selectArrow : classes.selectArrowError}/>
                    </button>
                </div>
            }
            <div className={isListVisible ? valid ? classes.selectListModal : classes.selectListModalError :
                                            valid ? classes.selectBody : classes.selectBodyError}>
                {
                    !isListVisible &&
                    <span className={valid ? classes.placeholder : classes.placeholderError}>
                        {value === "" ? props.placeholder : ''}
                    </span>
                }
                {
                    !isListVisible &&
                    <button className={classes.selectClick}>
                        <BiSolidDownArrow className={valid ? classes.selectArrow : classes.selectArrowError}/>
                    </button>
                }
                <select
                    ref={ref}
                    value={default_value_number}
                    onBlur={handleBlur}
                    size={isListVisible ? 6 : 1}
                    className={valid ? classes.selectList : classes.selectListError}
                    onChange={e => {
                        setIsListVisible(false);
                        setValue(e.target.options[e.target.selectedIndex].text);
                        props.onChange !== undefined && props.onChange(e);
                    }}>
                    <option disabled selected value style={{display: 'none'}}></option>
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