import React, {useState} from 'react';
import classes from './MajorCheckbox.module.css'
const MajorCheckbox = ({style, checked = false, children, ...props}) => {
    const [isChecked, setIsChecked] = useState(checked);

    return (
        <div style = {style} className={classes.majorCheckbox} onClick={ () => {setIsChecked(!isChecked); props.onChange(!isChecked)} } >
            <div  className={isChecked ? classes.checked : classes.unchecked}></div>
            <input
                type="checkbox"
                {...props}
                checked={isChecked}
            />
            <label>{children}</label>
        </div>
    );
};

export default MajorCheckbox;