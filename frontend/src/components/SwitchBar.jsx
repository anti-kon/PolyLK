import React, {useLayoutEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import ShadowButton from "./UI/buttons/shadow_button/ShadowButton";
import {BiInfoCircle, BiNews} from "react-icons/bi";
import {TbTag} from "react-icons/tb";
import {HiPlus} from "react-icons/hi";
import "../styles/SwitchBar.css"

const SwitchBar = (props) => {
    const navigate = useNavigate();

    const iconsStyle = {width: "24px",
                        height: "auto",
                        marginRight: "3px",
                        marginLeft: "-3px"};

    return (
        <div {...props} style={{minWidth: "188px"}}>
            <a href={"../news"} className={"switch-bar-text-link"}>
                <BiNews style={iconsStyle}/>
                Новости
            </a>
            <a href={"../bulletin_board"} className={"switch-bar-text-link"}>
                <TbTag style={iconsStyle}/>
                Объявления
            </a>
            <a href={"../appointments"} className={"switch-bar-text-link"}>
                <HiPlus style={iconsStyle}/>
                Запись
            </a>
            <a href={"../faq"} className={"switch-bar-text-link"}>
                <BiInfoCircle style={iconsStyle}/>
                Информация
            </a>
        </div>
    );
};

export default SwitchBar;