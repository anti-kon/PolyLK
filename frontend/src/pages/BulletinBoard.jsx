import React, {useEffect, useState} from 'react';
import SwitchBar from "../components/SwitchBar";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/BulletinBoard.css";
import ContentBox from "../components/UI/content_boxes/content_box/ContentBox";
import AdvertisementComponent from "../components/AdvertisementComponent";
import ShadowButton from "../components/UI/buttons/shadow_button/ShadowButton";
import {TiDocumentText} from "react-icons/ti";
import ResizeableTextarea from "../components/UI/textareas/resizeable_textarea/ResizeableTextarea";
import TextInput from "../components/UI/inputs/text_input/TextInput";
import MajorButton from "../components/UI/buttons/major_button/MajorButton";
import {BiPaperclip} from "react-icons/bi";
import {BsPaperclip} from "react-icons/bs";


const BulletinBoard = () => {

    const inputRef = React.useRef(null);

    const advertisements = [{id: 0, login: "User1", text: "Написание текстов для главных страниц сайта – дело непростое. Проблема в том, что существует сразу несколько подходов к подготовке таких материалов.", moneyPrice: '500', alternativePrice: '10 печенек'},
        {id: 1, login: "User2", text: "Для удобства мы разнесли «главные тексты» по 4 условным категориям. Сразу хотим предупредить, что категории это не обособленные: частенько можно встретить работы, которые вбирают в себя признаки сразу нескольких типов. Также здесь не упоминаются тексты для лендингов, где главная страница – основа основ. Речь пойдет об обычных, «классических» сайтах. Довольно демагогии с нашей стороны, приступаем.", moneyPrice: '200', alternativePrice: null},
        {id: 2, login: "User3", text: "Для удобства мы разнесли «главные тексты» по 4 условным категориям. Сразу хотим предупредить, что категории это не обособленные: частенько можно встретить работы, которые вбирают в себя признаки сразу нескольких типов. Также здесь не упоминаются тексты для лендингов, где главная страница – основа основ. Речь пойдет об обычных, «классических» сайтах. Довольно демагогии с нашей стороны, приступаем.", moneyPrice: null, alternativePrice: '3 шоколадки'}]

    const [showMyAds, setShowMyAdd] = useState(false);
    const [moneyPrice, setMoneyPrice] = useState("")
    const [advertisementText, setAdvertisementText] = useState("")
    const [alternativePrice, setAlternativePrice] = useState("")

    const iconsStyle = {width: "24px",
        height: "auto",
        marginRight: "3px",
        marginLeft: "-3px"};
    const changeMoneyPrice = (e) => {
        const regExp = /^\d+$/;
        e.target.value.match(regExp) !== null && setMoneyPrice(e.target.value) || e.target.value == "" && setMoneyPrice("");
    }

    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"bulletin-board-page"}>
                <SwitchBar></SwitchBar>
                <div className={"advertisements-list"}>
                    <ContentBox style={{display: "flex", marginBottom: "20px", boxSizing: "border-box"}}>
                        <div className={'advertisement-edit-body'}>
                            <label className={'advertisement-login'} >Разместить объявление</label>
                            <ResizeableTextarea
                                placeholder={"Введите текст"}
                                style={{margin: "10px 1px ", paddingLeft: "0px",}}
                                value = {advertisementText}
                                onChange = {e => setAdvertisementText(e.target.value)}>
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
                                    margin: '0 0 0 10px' }}>Разместить</MajorButton>
                            </div>

                        </div>
                    </ContentBox>
                    {advertisements.map((advertisement) =>
                        <ContentBox key={advertisement.id}
                                    style={{display: "flex", marginBottom: "20px", boxSizing: "border-box"}}>
                            <AdvertisementComponent
                                login={advertisement.login}
                                moneyPrice={advertisement.moneyPrice}
                                alternativePrice={advertisement.alternativePrice}>
                                {advertisement.text}
                            </AdvertisementComponent>
                        </ContentBox>
                    )}
                </div>
                <div className={"advertisement-right-button-bar"}>
                { showMyAds ? <ShadowButton onClick = {() => setShowMyAdd(false)}> <TiDocumentText style = {iconsStyle}/> Все объявления</ShadowButton> : <ShadowButton onClick = {() => setShowMyAdd(true)}> <TiDocumentText style = {iconsStyle} /> Мои объявления</ShadowButton>}
                </div>
            </div>
        </div>
    );
};

export default BulletinBoard;