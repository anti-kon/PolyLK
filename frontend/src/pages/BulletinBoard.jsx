import React from 'react';
import SwitchBar from "../components/SwitchBar";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/BulletinBoard.css";
import ContentBox from "../components/UI/content_boxes/content_box/ContentBox";
import AdvertisementComponent from "../components/AdvertisementComponent";

const advertisements = [{id: 0, text: "Написание текстов для главных страниц сайта – дело непростое. Проблема в том, что существует сразу несколько подходов к подготовке таких материалов.", moneyPrice: '500 руб.', alternativePrice: '10 печенек'},
    {id: 1, text: "Для удобства мы разнесли «главные тексты» по 4 условным категориям. Сразу хотим предупредить, что категории это не обособленные: частенько можно встретить работы, которые вбирают в себя признаки сразу нескольких типов. Также здесь не упоминаются тексты для лендингов, где главная страница – основа основ. Речь пойдет об обычных, «классических» сайтах. Довольно демагогии с нашей стороны, приступаем.", moneyPrice: '200 руб.', alternativePrice: null},
    {id: 2, text: "Для удобства мы разнесли «главные тексты» по 4 условным категориям. Сразу хотим предупредить, что категории это не обособленные: частенько можно встретить работы, которые вбирают в себя признаки сразу нескольких типов. Также здесь не упоминаются тексты для лендингов, где главная страница – основа основ. Речь пойдет об обычных, «классических» сайтах. Довольно демагогии с нашей стороны, приступаем.", moneyPrice: null, alternativePrice: '3 шоколадки'}]

const BulletinBoard = () => {
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
            </div>
        </div>
    );
};

export default BulletinBoard;