import React, {useEffect, useRef, useState} from 'react';
import {BiCog, BiDotsHorizontalRounded, BiExit, BiUser} from "react-icons/bi";
import ContentBox from "./UI/content_boxes/content_box/ContentBox";
import classes from "./UI/headers/MajorHeader/MajorHeader.module.css";
import ShadowButton from "./UI/buttons/shadow_button/ShadowButton";
import ResizeableTextarea from "./UI/textareas/resizeable_textarea/ResizeableTextarea";
import TextInput from "./UI/inputs/text_input/TextInput";
import {BsPaperclip} from "react-icons/bs";
import MajorButton from "./UI/buttons/major_button/MajorButton";

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
    const inputRef = useRef(null);

    const [text, setText] = useState(adoptText(props.children));
    const [isFullTextVisible, setIsFullTextVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [moneyPrice, setMoneyPrice] = useState(props.moneyPrice === null ? "" : props.moneyPrice)
    const [alternativePrice, setAlternativePrice] = useState(props.alternativePrice === null ? "" : props.alternativePrice)

    const showButton = isNeedAdopt(props.children);

    const changeMoneyPrice = (e) => {
        const regExp = /^\d+$/;
        e.target.value.match(regExp) !== null && setMoneyPrice(e.target.value) || e.target.value == "" && setMoneyPrice("");
    }

    const onButtonClick = () => {
        inputRef.current.click();
    };

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
                {!isEdit && <button style={{marginLeft: "auto"}} className={"advertisement-frameless-button"} ref={buttonOpenModel}>
                    <BiDotsHorizontalRounded
                        onClick = {() => {setIsModalVisible(!isModalVisible);}}
                        style={{
                            width: "28px",
                            height: "auto",
                            strokeWidth: "0.7px"
                        }}/>
                </button>}
                { isModalVisible &&
                    <ContentBox style={{
                        maxWidth: "min-content",
                        position: "absolute",
                        top: "20px",

                        right: "-5px",
                        background: "white"}}>
                        <div ref={modal} className={classes.modalContent}>
                            <ShadowButton onClick={() => {setIsEdit(true); setIsModalVisible(false);}}
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
            { isEdit ?
                <div>
                    <ResizeableTextarea
                        placeholder={"Введите текст"}
                        style={{margin: "10px 1px ", paddingLeft: "0px",}}
                        value = {text}
                        onChange = {e => setText(e.target.value)}>
                    </ResizeableTextarea>
                    <div className={'advertisement-edit-fields'}>
                        <TextInput
                            valid={'true'}
                            placeholder={'Цена'}
                            style={{marginRight: "10px"}}
                            value = {moneyPrice}
                            onChange = {e => changeMoneyPrice(e)}>
                        </TextInput>
                        <TextInput
                            valid={'true'}
                            placeholder={'Бартер'}
                            style={{marginLeft: "10px"}}
                            value = {alternativePrice}
                            onChange = {e => setAlternativePrice(e.target.value)}>
                        </TextInput>
                    </div>

                    <div className={'advertisement-edit-buttons'}>
                        <input ref={inputRef} type="file" multiple={true} />
                        <button className={'advertisement-edit-button-clip'}
                                onClick={ () => {onButtonClick()} }>
                            <BsPaperclip />
                        </button>
                        <MajorButton style={{width: 'max-content',
                            padding: '4px 15px',
                            borderRadius: '5px',
                            margin: '0 0 0 10px' }}
                            onClick = {() => {setIsEdit(false)}}>Сохранить</MajorButton>
                    </div>
                </div> :
                <div>
                    <p className={'advertisement-text'}>{text}</p>
                    {showButton && (
                        !isFullTextVisible ?
                            <button
                                className={'advertisement-show-more'}
                                onClick={() => {setText(props.children);
                                    setIsFullTextVisible(true)}}>
                                Показать ещё
                            </button> :
                            <button
                                className={'advertisement-show-more'}
                                onClick={() => {setText(adoptText(props.children));
                                    setIsFullTextVisible(false)}}>
                                Скрыть
                            </button>
                    )}
                    <div className={'advertisement-price-block'}>
                        {moneyPrice !== "" && <label>{moneyPrice} руб.</label>}
                        {moneyPrice !== "" && alternativePrice !== "" &&
                            <label className={'advertisement-spacer-price'}>/</label>}
                        {alternativePrice !== "" && <label>{alternativePrice}</label>}
                    </div>
                </div>}
        </div>
    );
};

export default AdvertisementComponent;