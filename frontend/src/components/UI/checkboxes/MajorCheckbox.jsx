import React, {useState} from 'react';
import classes from './MajorCheckbox.module.css'
const MajorCheckbox = ({children, ...props}) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className={classes.majorCheckbox} onClick={ () => {setIsChecked(!isChecked); props.onChange(!isChecked)} } >
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