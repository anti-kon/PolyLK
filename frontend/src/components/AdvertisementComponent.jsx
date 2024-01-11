import React, {useEffect, useRef, useState} from 'react';
import {BiCog, BiDotsHorizontalRounded, BiExit, BiUser} from "react-icons/bi";
import ContentBox from "./UI/content_boxes/content_box/ContentBox";
import classes from "./UI/headers/MajorHeader/MajorHeader.module.css";
import ShadowButton from "./UI/buttons/shadow_button/ShadowButton";

const AdvertisementComponent = (props) => {
    const maxTextLength = 256;

    const isNeedAdopt = (inputText) => {
        return inputText.length > maxTextLength;
    }

    const adoptText = (inputText) => {
        let lastWordIndex = inputText.slice(0, (maxTextLength + 1)).lastIndexOf(' ');
        lastWordIndex = lastWordIndex > maxTextLength ? maxTextLength : lastWordIndex;
        return isNeedAdopt(inputText) ? inputText.slice(0, lastWordIndex) + '...' : inputText;
    }

    const modal = useRef(null);
    const buttonOpenModel = useRef(null);

    const [text, setTest] = useState(adoptText(props.children));
    const [isFullTextVisible, setIsFullTextVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false)

    const showButton = isNeedAdopt(props.children);

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
        <div className={'advertisement-body'}>
            <div className={'advertisement-label'} >
                <label className={'advertisement-login'}>{props.login}</label>
                <button style={{marginLeft: "auto"}} className={"advertisement-frameless-button"} ref={buttonOpenModel}>
                    <BiDotsHorizontalRounded
                        onClick = {() => {setIsModalVisible(!isModalVisible);}}
                        style={{
                            width: "28px",
                            height: "auto",
                            strokeWidth: "0.7px"
                        }}/>
                </button>
                { isModalVisible &&
                    <ContentBox style={{
                        maxWidth: "min-content",
                        position: "absolute",
                        top: "20px",

                        right: "-5px",
                        background: "white"}}>
                        <div ref={modal} className={classes.modalContent}>
                            <ShadowButton onClick={() => {console.log("Edit");}}
                                          style={{
                                              minWidth: "max-content",
                                              fontSize: "15px",
                                              padding: "3px 7px 3px 6px"}}>
                                Редактировать
                            </ShadowButton>
                            <ShadowButton onClick={() => {console.log("Delete");}}
                                          style={{
                                              minWidth: "max-content",
                                              fontSize: "15px",
                                              padding: "3px 7px 3px 6px"}}>
                                Удалить
                            </ShadowButton>
                        </div>
                    </ContentBox>}
            </div>
            <p className={'advertisement-text'}>{text}</p>
            {showButton && (
                !isFullTextVisible ?
                    <button
                        className={'advertisement-show-more'}
                        onClick={() => {setTest(props.children);
                            setIsFullTextVisible(true)}}>
                        Показать ещё
                    </button> :
                    <button
                        className={'advertisement-show-more'}
                        onClick={() => {setTest(adoptText(props.children));
                            setIsFullTextVisible(false)}}>
                        Скрыть
                    </button>
            )}
            <div className={'advertisement-price-block'}>
                {props.moneyPrice !== null && <label>{props.moneyPrice}</label>}
                {props.moneyPrice !== null && props.alternativePrice !== null &&
                    <label className={'advertisement-spacer-price'}>/</label>}
                {props.alternativePrice !== null && <label>{props.alternativePrice}</label>}
            </div>
        </div>
    );
};

export default AdvertisementComponent;