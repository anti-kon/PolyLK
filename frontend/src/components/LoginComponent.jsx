import React, {useState} from 'react';
import TextInput from "./UI/inputs/text_input/TextInput";
import PasswordInput from "./UI/inputs/password_input/PasswordInput";
import MajorButton from "./UI/buttons/major_button/MajorButton";
import "../styles/Login.css"
import img from "../img/icon.svg";
import {useNavigate} from "react-router-dom";

const LoginComponent = (props) => {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(true);

    const account = {login: "root", password: "12345"};

    const checkLogin = () => {
        if (login === account.login && password === account.password) {
            props.loginFunc({id: 1, login: login, password: password, dorNum: 0});
            navigate('../news');
            setIsValid(true)
        } else
            setIsValid(false);
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
            <div style={{marginTop: "10px", display: "flex", justifyContent: "center"}}>
                <MajorButton
                    onClick={() => {checkLogin()}}
                    style={{height: "60px", width: "180px", borderRadius: "7px", fontSize: "24px"}}>
                    Войти
                </MajorButton>
            </div>
            <label onClick={() => {navigate("../signup");}} className={"login-text-link"}>Зарегистрироваться</label>
        </div>
    );
};

export default LoginComponent;
