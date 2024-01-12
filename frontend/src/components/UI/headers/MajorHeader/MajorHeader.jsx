import React, {useEffect, useRef, useState} from 'react';
import classes from "./MajorHeader.module.css";
import img from "../../../../img/icon.svg";
import {BiExit, BiSolidDownArrow, BiUser} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import ContentBox from "../../content_boxes/content_box/ContentBox";
import ShadowButton from "../../buttons/shadow_button/ShadowButton";

const MajorHeader = () => {
    const navigate = useNavigate();
    
    const [isModalVisible, setIsModalVisible] = useState(false)

    const modal = useRef(null);
    const buttonOpenModel = useRef(null);

    useEffect(() => {
         const onClick = e => {
             if (modal.current != null &&
                 !modal.current.contains(e.target) &&
                 !buttonOpenModel.current.contains(e.target))
                 setIsModalVisible(false);
         }
         document.addEventListener('click', onClick);
         return () => document.removeEventListener('click', onClick);
    }, []);


    return (
        <header id={"major_header"} className={classes.majorHeader}>
            <div className={classes.headerContent}>
                <img className={classes.iconStyle} src={img}/>
                <div ref={buttonOpenModel}
                     onClick={() => {setIsModalVisible(!isModalVisible);}}
                     className={classes.accountButton}>
                    <label className={classes.accountLabel}>Пользователь</label>
                    <BiSolidDownArrow className={classes.arrowStyle} />
                </div>
                {isModalVisible &&
                    <ContentBox style={{
                                    maxWidth: "min-content",
                                    position: "absolute",
                                    top: "43px",
                                    right: "7px",
                                    background: "white"}}>
                        <div ref={modal} className={classes.modalContent}>
                            <ShadowButton onClick={() => {navigate("../account");}}
                                          style={{
                                              minWidth: "max-content",
                                              fontSize: "15px",
                                              padding: "3px 7px 3px 6px"}}>
                                <BiUser className={classes.accountButtonIcon}/>Личный кабинет
                            </ShadowButton>
                            <ShadowButton onClick={() => {navigate("../login")}}
                                          style={{
                                              minWidth: "max-content",
                                              fontSize: "15px",
                                              padding: "3px 7px 3px 6px"}}>
                                <BiExit className={classes.exitButtonIcon}/>Выйти
                            </ShadowButton>
                        </div>
                    </ContentBox>}
            </div>
        </header>
    );
};

export default MajorHeader;