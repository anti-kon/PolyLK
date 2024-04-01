import React from 'react';
import ShadowButton from "../../buttons/shadow_button/ShadowButton";
import {BiInfoCircle, BiNews} from "react-icons/bi";
import {TbTag} from "react-icons/tb";
import {HiPlus} from "react-icons/hi";
import {useNavigate} from "react-router-dom";
import classes from "./MajorFooter.module.css";

const MajorFooter = () => {
    const navigate = useNavigate();

    return (
        <footer className={classes.majorFooter}>
            <ShadowButton onClick={() => {navigate('../news');}}>
                <BiNews className={classes.iconStyle} />

            </ShadowButton>
            <ShadowButton onClick={() => {navigate('../bulletin_board');}}>
                <TbTag className={classes.iconStyle}/>

            </ShadowButton>
            <ShadowButton onClick={() => {navigate('../appointments');}}>
                <HiPlus className={classes.iconStyle}/>

            </ShadowButton>
            <ShadowButton onClick={() => {navigate('../faq');}}>
                <BiInfoCircle className={classes.iconStyle}/>

            </ShadowButton>
        </footer>
    );
};

export default MajorFooter;