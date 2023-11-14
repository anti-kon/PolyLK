import React from 'react';
import SwitchBar from "../components/SwitchBar";
import ContentBox from "../components/UI/content_boxes/content_box/ContentBox";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/News.css";

const News = () => {
    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"news-page"}>
                <SwitchBar></SwitchBar>
                <ContentBox><p>Это пример новости, использующей фотографию и  большое (даже огромное) количество воды, чтобы показать насколько большими могут быть новыстные статьи, и что в случае чего, может потребоваться сворачивать и разворачивать его, это функционал реализуется посредством кнопки...</p></ContentBox>
            </div>
        </div>
    );
};

export default News;