import React from 'react';
import TextInput from "./UI/inputs/text_input/TextInput";
import PasswordInput from "./UI/inputs/password_input/PasswordInput";
import MajorButton from "./UI/buttons/major_button/MajorButton";
import "../styles/Login.css"
import img from "../img/icon.svg";
import {useNavigate} from "react-router-dom";

const LoginComponent = () => {
    const navigate = useNavigate();

    return (
        <div className={"login-panel"}>
            <div style={{display: "flex", justifyContent: "center"}}>
                <img style={{width: "80px", height: "auto", margin: "auto"}} src={img}/>
            </div>
            <TextInput
                style={{marginTop: "30px", fontSize: "20px", borderRadius: "7px"}}
                placeholder={"Логин"}>
            </TextInput>
            <PasswordInput
                style={{marginTop: "30px", fontSize: "20px", borderRadius: "7px"}}
                placeholder={"Пароль"}>
            </PasswordInput>
            <div style={{marginTop: "30px", display: "flex", justifyContent: "center"}}>
                <MajorButton
                    onClick={() => {navigate('../news');}}
                    style={{height: "60px", width: "180px", borderRadius: "7px", fontSize: "24px"}}>
                    Войти
                </MajorButton>
            </div>
            <label className={"login-text-link"}>Зарегистрироваться</label>
        </div>
    );
};

export default LoginComponent;