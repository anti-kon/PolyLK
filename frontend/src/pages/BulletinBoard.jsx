import React, {useState} from 'react';
import SwitchBar from "../components/SwitchBar";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/BulletinBoard.css";
import ContentBox from "../components/UI/content_boxes/content_box/ContentBox";
import AdvertisementComponent from "../components/AdvertisementComponent";
import ShadowButton from "../components/UI/buttons/shadow_button/ShadowButton";
import {TiDocumentText} from "react-icons/ti";


const BulletinBoard = () => {

    const advertisements = [{id: 0, text: "Написание текстов для главных страниц сайта – дело непростое. Проблема в том, что существует сразу несколько подходов к подготовке таких материалов.", moneyPrice: '500 руб.', alternativePrice: '10 печенек'},
        {id: 1, text: "Для удобства мы разнесли «главные тексты» по 4 условным категориям. Сразу хотим предупредить, что категории это не обособленные: частенько можно встретить работы, которые вбирают в себя признаки сразу нескольких типов. Также здесь не упоминаются тексты для лендингов, где главная страница – основа основ. Речь пойдет об обычных, «классических» сайтах. Довольно демагогии с нашей стороны, приступаем.", moneyPrice: '200 руб.', alternativePrice: null},
        {id: 2, text: "Для удобства мы разнесли «главные тексты» по 4 условным категориям. Сразу хотим предупредить, что категории это не обособленные: частенько можно встретить работы, которые вбирают в себя признаки сразу нескольких типов. Также здесь не упоминаются тексты для лендингов, где главная страница – основа основ. Речь пойдет об обычных, «классических» сайтах. Довольно демагогии с нашей стороны, приступаем.", moneyPrice: null, alternativePrice: '3 шоколадки'}]

    const [showMyAds, setShowMyAdd] = useState(false);

    const iconsStyle = {width: "24px",
        height: "auto",
        marginRight: "3px",
        marginLeft: "-3px"};

    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"bulletin-board-page"}>
                <SwitchBar></SwitchBar>
                <div className={"advertisements-list"}>
                    {advertisements.map((advertisement) =>
                        <ContentBox key={advertisement.id}
                                    style={{display: "flex", marginBottom: "20px", boxSizing: "border-box"}}>
                            <AdvertisementComponent
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