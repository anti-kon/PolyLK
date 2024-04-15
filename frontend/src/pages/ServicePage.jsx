import React, {useContext, useEffect, useState} from 'react';
import img from "../img/icon.svg";
import "../styles/ServicePage.css";
import {useNavigate} from "react-router-dom";
import { InfoContext } from "../App";

const ServicePage = () => {
    const {infoMessage, setInfoMessage} = useContext(InfoContext);
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        function handleWindowResize() {
            setWindowWidth(document.documentElement.clientWidth ? document.documentElement.clientWidth : 0);
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    return (
        <div className={"service-page"}>

            <div className={"info-block"}>
                <div className={"service-page-icon"} style={windowWidth < 670 ? {} : {"position": "absolute", "top": "20px", left: "31px", margin: "0"}}>
                    <img style={{width: "80px", height: "auto", margin: "auto"}} src={img}/>
                </div>
                <label className={"status"}>{infoMessage.status}</label>
                <p className={"message"}>{infoMessage.message}</p>
                <a
                    className={"link-button"}
                    href={infoMessage.link}>
                    {infoMessage.link_title}
                </a>
            </div>
        </div>
    );
};

export default ServicePage;