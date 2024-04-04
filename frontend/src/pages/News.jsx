import React, {useLayoutEffect, useRef, useContext, useEffect, useState} from 'react';
import SwitchBar from "../components/SwitchBar";
import ContentBox from "../components/UI/content_boxes/content_box/ContentBox";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/News.css";
import NewsComponent from "../components/NewsComponent";
import axios from "axios";
import CircleDotsLoading from "../components/UI/loaders/CircleDotsLoading";
import {useNavigate} from "react-router-dom";
import {encode} from "js-base64";
import {InfoContext} from "../App";

const News = () => {
    const [isResponseValid, setIsResponseValid] = useState(false);
    const [isProcessed, setIsProcessed] = useState(true);
    const [news, setNews] = useState([]);

    const navigate = useNavigate();

    const {setInfoMessage} = useContext(InfoContext);

    const updateInfoMessage = (status, message, link, link_title) => {
        setInfoMessage( {
            status: status,
            message: message,
            link: link,
            link_title: link_title
        });

        return encode(new Date().getMilliseconds() + new Date().getDate() + status.length + 523);
    }

    const loadNews = () => {
        setIsProcessed(true);
        axios.get('http://localhost:8080/django-news/news/', {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('access-token')).value}`}
        }).then(response => {
                setIsProcessed(false);
                setIsResponseValid(true);
                if(response.status === 200) {
                    setNews(response.data);
                }
            }).catch(error => {
            setIsProcessed(false);
            if (error.code === "ERR_NETWORK") {
                setIsResponseValid(false);
            } else if (error.response.status === 401) {
                navigate("../message/" + updateInfoMessage(
                    error.response.status.toString(),
                    error.response.data,
                    "../login",
                    "Вернуться на страницу авторизации"));
            } else {
                setIsResponseValid(false);
            }
        });
    }

    useEffect(() => {
        loadNews();
    }, []);

    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"news-page"}>
                <SwitchBar></SwitchBar>
                <div className={"news-list"}>
                    {
                        isProcessed ? <div style={{
                            display: "flex",
                            margin: "20px",
                            justifyContent: "center"}}>
                                <CircleDotsLoading size={"80px"} color={"#68a3a3"}/>
                                                </div> :
                        !isResponseValid ?
                            <div style={{
                                margin: "20px",
                                display: "block",
                                overflow: "clip"
                            }}>
                                <p style={{textAlign: "center"}} className={"news-text"}>
                                    Не удалось загрузить данные
                                </p>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "15px"
                                }}>
                                    <button
                                        className={"advertisement-show-more"}
                                        onClick={() => loadNews()}>
                                        Попробовать снова
                                    </button>
                                </div>
                            </div> :
                            news.map((oneNews) =>
                            <ContentBox key={oneNews.id_new} style={{display: "flex", maxWidth: "100%", overflow: "clip", marginBottom: "20px", boxSizing: "border-box"}}>
                                <NewsComponent images={oneNews.list_photo_new} id={oneNews.id_new}>{oneNews.text_new}</NewsComponent>
                            </ContentBox>
                    )}
                </div>
            </div>
        </div>
    );
};

export default News;
