import React from 'react';
import classes from "./MajorHeader.module.css";
import img from "../../../../img/icon.svg";
import {BiSolidDownArrow} from "react-icons/bi";

const MajorHeader = () => {
    return (
        <header className={classes.majorHeader}>
            <img className={classes.iconStyle} src={img}/>
            <label className={classes.accountLabel}>Пользователь</label>
            <BiSolidDownArrow className={classes.arrowStyle} />
        </header>
    );
};

export default MajorHeader;