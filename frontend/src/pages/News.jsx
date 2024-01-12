import React, {useLayoutEffect, useRef, useState} from 'react';
import SwitchBar from "../components/SwitchBar";
import ContentBox from "../components/UI/content_boxes/content_box/ContentBox";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/News.css";
import NewsComponent from "../components/NewsComponent";

const news = [{id: 0, text: "Написание текстов для главных страниц сайта – дело непростое. Проблема в том, что существует сразу несколько подходов к подготовке таких материалов.", images: [{id: 0, url: "https://cdn.fishki.net/upload/post/2016/07/27/2025170/23-1.jpg"}, {id: 1, url: "https://gas-kvas.com/uploads/posts/2023-02/1675485320_gas-kvas-com-p-fonovii-risunok-dlya-rabochego-stola-koshk-13.jpg"}, {id: 2, url: "https://gas-kvas.com/grafic/uploads/posts/2023-09/1695798558_gas-kvas-com-p-kartinki-koshka-19.jpg"}]},
              {id: 1, text: "Для удобства мы разнесли «главные тексты» по 4 условным категориям. Сразу хотим предупредить, что категории это не обособленные: частенько можно встретить работы, которые вбирают в себя признаки сразу нескольких типов. Также здесь не упоминаются тексты для лендингов, где главная страница – основа основ. Речь пойдет об обычных, «классических» сайтах. Довольно демагогии с нашей стороны, приступаем.", images: [{id: 0, url: "https://zagge.ru/wp-content/uploads/2019/06/aHR0cDovL3d3dy5saXZlc2N.jpg"}, {id: 1, url: "https://w.forfun.com/fetch/d8/d8e6b9afd8951bcc2a823175b5d1add1.jpeg"}]},
              {id: 2, text: "Для удобства мы разнесли «главные тексты» по 4 условным категориям. Сразу хотим предупредить, что категории это не обособленные: частенько можно встретить работы, которые вбирают в себя признаки сразу нескольких типов. Также здесь не упоминаются тексты для лендингов, где главная страница – основа основ. Речь пойдет об обычных, «классических» сайтах. Довольно демагогии с нашей стороны, приступаем.", images: [{id: 0, url: "https://legkovmeste.ru/wp-content/uploads/2019/02/post_5b03385e7aaa8.jpg"}]},
              {id: 3, text: "Для удобства мы разнесли «главные тексты» по 4 условным категориям. Сразу хотим предупредить, что категории это не обособленные: частенько можно встретить работы, которые вбирают в себя признаки сразу нескольких типов. Также здесь не упоминаются тексты для лендингов, где главная страница – основа основ. Речь пойдет об обычных, «классических» сайтах. Довольно демагогии с нашей стороны, приступаем.", images: [{id: 0, url: "https://webpulse.imgsmail.ru/imgpreview?mb=webpulse&key=pulse_cabinet-image-57aa7c6c-9124-45d4-9ced-8aa54dabc706"}, {id: 1, url: "https://funart.pro/uploads/posts/2021-07/1626253666_1-funart-pro-p-kot-britanets-korotkosherstnii-zhivotnie-k-1.jpg"}, {id: 2, url: "https://proprikol.ru/wp-content/uploads/2020/08/krasivye-kartinki-kotov-25.jpg"}, {id: 3, url: "https://w.forfun.com/fetch/c4/c4278a31d1820f1df09421a893726338.jpeg"}, {id: 4, url: "https://get.wallhere.com/photo/1600x1200-px-animal-cat-cats-cute-Kitty-pet-sweet-1915431.jpg"}]},
              {id: 4, text: "Для удобства мы разнесли «главные тексты» по 4 условным категориям. Сразу хотим предупредить, что категории это не обособленные: частенько можно встретить работы, которые вбирают в себя признаки сразу нескольких типов. Также здесь не упоминаются тексты для лендингов, где главная страница – основа основ. Речь пойдет об обычных, «классических» сайтах. Довольно демагогии с нашей стороны, приступаем.", images: [{id: 0, url: "https://w.forfun.com/fetch/92/92fc3bc2ce63665b89c57294fd21d18d.jpeg"}, {id: 1, url: "https://w.forfun.com/fetch/a7/a782f0afe82e34299646f40c0967b7bc.jpeg"}, {id: 2, url: "https://img.fonwall.ru/o/70/kotenok-morda-lapyi-hvost.jpg"}, {id: 3, url: "https://animalreader.ru/wp-content/uploads/2015/04/ostrov-koshek-animalreader.ru_.jpg"}, {id: 4, url: "https://w.forfun.com/fetch/17/17e4d61855a953de898ad63919c582fb.jpeg"}, {id: 5, url: "https://natalyland.ru/wp-content/uploads/7/3/1/731d2ec7ed84405e073043941806ae21.jpeg"}, {id: 6, url: "https://zooblog.ru/wp-content/uploads/2021/02/abissinskaya-koshka.jpg"}, {id: 7, url: "https://sun9-68.userapi.com/impg/Cuh8mRgRJ27JEPoEuDwESgdsBRwT2CFogeJF9Q/YDi0QW8NLkc.jpg?size=2560x1440&quality=96&sign=f40b92c98db3003a239de3597b005481&type=album"}, {id: 8, url: "https://bugaga.ru/uploads/posts/2017-01/1483531805_dvulikaya-koshka-yana-8.jpg"}, {id: 9, url: "https://w.forfun.com/fetch/28/2884b4c88cd0d6bae7ef9d3b999e5581.jpeg"}, {id: 10, url: "https://img.goodfon.ru/original/3694x2463/6/9a/evropeyskaya-koshka-dikiy-kot.jpg"}]}]

const News = () => {
    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"news-page"}>
                <SwitchBar></SwitchBar>
                <div className={"news-list"}>
                    {news.map((oneNews) =>
                        <ContentBox key={oneNews.id} style={{display: "flex", maxWidth: "100%", overflow: "clip", marginBottom: "20px", boxSizing: "border-box"}}>
                            <NewsComponent images={oneNews.images} id={oneNews.id}>{oneNews.text}</NewsComponent>
                        </ContentBox>
                    )}
                </div>
            </div>
        </div>
    );
};

export default News;
