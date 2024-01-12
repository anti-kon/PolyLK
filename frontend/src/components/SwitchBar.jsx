import React, {useLayoutEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import ShadowButton from "./UI/buttons/shadow_button/ShadowButton";
import {BiInfoCircle, BiNews} from "react-icons/bi";
import {TbTag} from "react-icons/tb";
import {HiPlus} from "react-icons/hi";

const SwitchBar = (props) => {
    const navigate = useNavigate();

    const iconsStyle = {width: "24px",
                        height: "auto",
                        marginRight: "3px",
                        marginLeft: "-3px"};

    return (
        <div {...props} style={{minWidth: "188px"}}>
            <ShadowButton onClick={() => {navigate('../news');}}>
                <BiNews style={iconsStyle}/>
                Новости
            </ShadowButton>
            <ShadowButton onClick={() => {navigate('../bulletin_board');}}>
                <TbTag style={iconsStyle}/>
                Объявления
            </ShadowButton>
            <ShadowButton onClick={() => {navigate('../appointments');}}>
                <HiPlus style={iconsStyle}/>
                Запись
            </ShadowButton>
            <ShadowButton onClick={() => {navigate('../faq');}}>
                <BiInfoCircle style={iconsStyle}/>
                Информация
            </ShadowButton>
        </div>
    );
};

export default SwitchBar;