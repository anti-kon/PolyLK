import React, {useContext, useState} from 'react';
import img from "../img/icon.svg";
import "../styles/ServicePage.css";
import {useNavigate} from "react-router-dom";
import { InfoContext } from "../App";

const ServicePage = () => {
    const {infoMessage, setInfoMessage} = useContext(InfoContext);
    const navigate = useNavigate();

    return (
        <div className={"service-page"}>
            <div style={{display: "flex", justifyContent: "center", position: "absolute", top: 20, left: 31}}>
                <img style={{width: "80px", height: "auto", margin: "auto"}} src={img}/>
            </div>
            <div className={"info-block"}>
                <label className={"status"}>{infoMessage.status}</label>
                <p className={"message"}>{infoMessage.message}</p>
                <button
                    className={"link-button"}
                    onClick={() => navigate(infoMessage.link)}>
                    {infoMessage.link_title}
                </button>
            </div>
        </div>
    );
};

export default ServicePage;