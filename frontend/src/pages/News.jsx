import React from 'react';
import SwitchBar from "../components/SwitchBar";
import ContentBox from "../components/UI/content_boxes/content_box/ContentBox";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/News.css";
import NewsComponent from "../components/NewsComponent";

const news = [{id: 0, text: "Написание текстов для главных страниц сайта – дело непростое. Проблема в том, что существует сразу несколько подходов к подготовке таких материалов."},
              {id: 1, text: "Для удобства мы разнесли «главные тексты» по 4 условным категориям. Сразу хотим предупредить, что категории это не обособленные: частенько можно встретить работы, которые вбирают в себя признаки сразу нескольких типов. Также здесь не упоминаются тексты для лендингов, где главная страница – основа основ. Речь пойдет об обычных, «классических» сайтах. Довольно демагогии с нашей стороны, приступаем."}]

const News = () => {
    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"news-page"}>
                <SwitchBar></SwitchBar>
                <div className={"news-list"}>
                    {news.map((oneNews) =>
                        <ContentBox key={oneNews.id} style={{display: "flex", marginBottom: "20px", boxSizing: "border-box"}}>
                            <NewsComponent>{oneNews.text}</NewsComponent>
                        </ContentBox>
                    )}
                </div>
            </div>
        </div>
    );
};

export default News;
