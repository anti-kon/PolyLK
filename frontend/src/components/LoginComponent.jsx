import React, {useContext, useState} from 'react';
import TextInput from "./UI/inputs/text_input/TextInput";
import PasswordInput from "./UI/inputs/password_input/PasswordInput";
import MajorButton from "./UI/buttons/major_button/MajorButton";
import "../styles/Login.css"
import img from "../img/icon.svg";
import {useNavigate} from "react-router-dom";
import {InfoContext, PersonContext} from '../App';
import axios from "axios";
import CircleDotsLoading from "./UI/loaders/CircleDotsLoading";
import {encode} from "js-base64";
import MajorCheckbox from "./UI/checkboxes/MajorCheckbox";

const LoginComponent = (props) => {
    const { person, setPerson } = useContext(PersonContext);
    const {setInfoMessage} = useContext(InfoContext);

    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [isProcessed, setIsProcessed] = useState(false);
    const [isRememberMe, setIsRememberMe] = useState(false)
    const updateInfoMessage = (status, message, link, link_title) => {
        setInfoMessage( {
            status: status,
            message: message,
            link: link,
            link_title: link_title
        });

        return encode(new Date().getMilliseconds() + new Date().getDate() + status.length + 523);
    }

    const checkLogin = () => {
        if (login.length === 0) {
            setIsValid(false);
            return;
        }
        if (password.length === 0){
            setIsValid(false);
            return;
        }
        setIsProcessed(true);
        axios.get('http://localhost:8002/authorization', {
            params: {
                login: login,
                password: password,
                isRememberMe: isRememberMe
            }
        }).then(response => {
            setIsProcessed(false);
            if(response.status === 200) {
                setPerson(response.data);
                navigate("../news");
            }
        }).catch(error => {
            setIsProcessed(false);
            if (error.code === "ERR_NETWORK") {
                navigate("../message/" + updateInfoMessage(
                    "502",
                    "Сервер не отвечает",
                    "../login",
                    "Вернуться на страницу авторизации"));
            } else if (error.response.status === 404) {
                setIsValid(false);
            } else if (error.response.status === 401) {
                setIsValid(false);
            } else {
                navigate("../message/" + updateInfoMessage(
                    error.response.status.toString(),
                    error.response.data,
                    "../login",
                    "Вернуться на страницу авторизации"));
            }
        });
    }

    return (
        <div className={"login-panel"}>
            <div style={{display: "flex", justifyContent: "center"}}>
                <img style={{width: "80px", height: "auto", margin: "auto"}} src={img}/>
            </div>
            <TextInput
                value={login}
                onChange={e => {setLogin(e.target.value)}}
                valid={isValid}
                style={{marginTop: "30px", fontSize: "20px", borderRadius: "7px"}}
                placeholder={"Логин"}>
            </TextInput>
            <PasswordInput
                value={password}
                onChange={e => {setPassword(e.target.value)}}
                valid={isValid}
                style={{marginTop: "30px", fontSize: "20px", borderRadius: "7px"}}
                placeholder={"Пароль"}>
            </PasswordInput>
            {!isValid ?
                <label className={"error-login-text"}>Неверный логин или пароль</label> :
                <div style={{height: "20px", marginTop: "10px"}}/>}
            <MajorCheckbox onChange = {(value) => setIsRememberMe(value)}>Запомнить меня</MajorCheckbox>
            <div style={{marginTop: "10px", display: "flex", justifyContent: "center"}}>
                <MajorButton
                    onClick={() => {checkLogin()}}
                    style={{height: "60px",
                            width: "180px",
                            borderRadius: "7px",
                            fontSize: "24px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"}}>
                    {isProcessed ? <CircleDotsLoading size={"40px"}/> : "Войти"}
                </MajorButton>
            </div>
            <button onClick={() => {navigate("../signup");}} className={"login-text-link"}>Зарегистрироваться</button>
        </div>
    );
};

export default LoginComponent;
