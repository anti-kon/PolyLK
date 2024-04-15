import React, {useEffect, useState} from 'react';
import classes from "./Select.module.css";
import {BiSolidDownArrow} from "react-icons/bi";

const Select = ({valid = true, default_value = "", ...props}) => {
    const [isListVisible,setIsListVisible] = useState(false);
    const [value, setValue] = useState(default_value);

    const handleBlur = (e) => {
        const currentTarget = e.currentTarget;

        requestAnimationFrame(() => {
            setIsListVisible(currentTarget.contains(document.activeElement))
        });
    };

    return (
        <div
            onFocus={() => setIsListVisible(true)}
            onBlur={handleBlur}>
            <div {...props} className={valid ? classes.selectBody : classes.selectBodyError}>
                <select className={"invisibleSelect"}></select>
                {value === "" ? props.placeholder : <label className={classes.selectValue}>{value}</label>}
                <button className={classes.selectClick}>
                    <BiSolidDownArrow className={valid ? classes.selectArrow : classes.selectArrowError}/>
                </button>
            </div>
            {
                isListVisible &&
                <div className={valid ? classes.selectListModal : classes.selectListModalError}>
                    <select
                        size={6}
                        className={valid ? classes.selectList : classes.selectListError}
                        onChange={e => {
                            setIsListVisible(false);
                            setValue(e.target.options[e.target.selectedIndex].text);
                            props.onChange !== undefined && props.onChange(e);
                        }}>
                        {props.options.map(option =>
                            <option
                                key={option.key}
                                className={classes.selectOption}
                                value={option.value}>{option.name}</option>
                        )}
                    </select>
                </div>
            }
        </div>
    );
};

export default Select;