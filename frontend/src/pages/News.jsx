import React from 'react';
import SwitchBar from "../components/SwitchBar";
import ContentBox from "../components/UI/content_boxes/content_box/ContentBox";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/News.css";
import NewsComponent from "../components/NewsComponent";

const News = () => {
    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"news-page"}>
                <SwitchBar></SwitchBar>
                <div>
                </div>
            </div>
        </div>
    );
};

export default News;
