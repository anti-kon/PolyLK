import React, {useContext, useEffect, useRef, useState} from 'react';
import {BiChat, BiDotsHorizontalRounded} from "react-icons/bi";
import ContentBox from "./UI/content_boxes/content_box/ContentBox";
import classes from "./UI/headers/MajorHeader/MajorHeader.module.css";
import ShadowButton from "./UI/buttons/shadow_button/ShadowButton";
import ResizeableTextarea from "./UI/textareas/resizeable_textarea/ResizeableTextarea";
import TextInput from "./UI/inputs/text_input/TextInput";
import {BsPaperclip} from "react-icons/bs";
import MajorButton from "./UI/buttons/major_button/MajorButton";
import LineImagesGallery from "./UI/images_gallery/LineImagesGallery/LineImagesGallery";
import axios from "axios";
import {encode} from "js-base64";
import {InfoContext, PersonContext} from "../App";
import {useNavigate} from "react-router-dom";
import CircleDotsLoading from "./UI/loaders/CircleDotsLoading";

const AdvertisementComponent = ({onDelete, ...props}) => {
    const [isProcessed, setIsProcessed] = useState(false);

    const {setInfoMessage} = useContext(InfoContext);

    const navigate = useNavigate();

    const maxTextLength = 256;

    const isNeedAdopt = (inputText) => {
        return inputText.length > maxTextLength;
    }

    const adoptText = (inputText) => {
        let lastWordIndex = inputText.slice(0, (maxTextLength + 1)).lastIndexOf(' ');
        lastWordIndex = lastWordIndex > maxTextLength ? maxTextLength : lastWordIndex;
        return isNeedAdopt(inputText) ? inputText.slice(0, lastWordIndex) + '...' : inputText;
    }

    const updateInfoMessage = (status, message, link, link_title) => {
        setInfoMessage( {
            status: status,
            message: message,
            link: link,
            link_title: link_title
        });

        return encode(new Date().getMilliseconds() + new Date().getDate() + status.length + 523);
    }

    const deleteAdvertisement = () => {
        setIsProcessed(true);
        axios.delete('http://212.109.221.176:8080/django-posts/posts/', {
            headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('access-token')).value}`,
            data: { id_ads: props.id}},
        }).then(response => {
            setIsProcessed(false);
            if(response.status === 200) {
                onDelete();
            }
        }).catch(error => {
            setIsProcessed(false);
            if (error.response.status === 401) {
                navigate("../message/" + updateInfoMessage(
                    error.response.status.toString(),
                    error.response.data,
                    "../login",
                    "Вернуться на страницу авторизации"));
            }
        });
    }

    // const changeAdvertisement = () => {
    //     setIsProcessed(true);
    //     axios.put('http://212.109.221.176:8080/django-posts/posts/', {
    //         id_ads: props.id,
    //         dorm_num_ads:,
    //         info_ads:,
    //         price_ads:,
    //         alternative_payment_ads:,
    //         list_photo_ads:,
    //         id_person_ads:,
    //     }, {
    //         headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('access-token')).value}`}
    //     }).then(response => {
    //         setIsProcessed(false);
    //         if(response.status === 200) {
    //             onDelete();
    //         }
    //     }).catch(error => {
    //         setIsProcessed(false);
    //         if (error.response.status === 401) {
    //             navigate("../message/" + updateInfoMessage(
    //                 error.response.status.toString(),
    //                 error.response.data,
    //                 "../login",
    //                 "Вернуться на страницу авторизации"));
    //         }
    //     });
    // }

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
                {!isEdit && <button style={{marginLeft: "auto", marginRight: "5px"}}
                                    className={"advertisement-frameless-button"}>
                    <BiChat
                        style={{
                            width: "22px",
                            height: "auto"
                        }}/>
                </button>}
                {!isEdit && <button className={"advertisement-frameless-button"}
                                    ref={buttonOpenModel}>
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
                            <ShadowButton onClick={() => {deleteAdvertisement();}}
                                          style={{
                                              minWidth: "max-content",
                                              fontSize: "15px",
                                              padding: "3px 7px 3px 6px"}}>
                                Удалить
                            </ShadowButton>
                        </div>
                    </ContentBox>}
            </div>
            { isProcessed ?
                <div style={{
                    display: "flex",
                    margin: "20px",
                    justifyContent: "center"}}>
                    <CircleDotsLoading size={"80px"} color={"#68a3a3"}/>
                </div> :
                isEdit ?
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
                            onClick = {() => {
                                setIsEdit(false);
                                // changeAdvertisement();
                            }}>Сохранить</MajorButton>
                    </div>
                </div> :
                <div>
                    <pre className={'advertisement-text'}>{text}</pre>
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
                    {props.images.length > 0 &&
                        <LineImagesGallery images={props.images}
                                           id={props.id}/>}
                    <div className={'advertisement-price-block'}>
                        {moneyPrice !== "" && <label>{moneyPrice} <b>₽</b></label>}
                        {moneyPrice !== "" && alternativePrice !== "" &&
                            <label className={'advertisement-spacer-price'}>/</label>}
                        {alternativePrice !== "" && <label>{alternativePrice}</label>}
                    </div>
                </div>}
        </div>
    );
};

export default AdvertisementComponent;