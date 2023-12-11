import React, {useEffect, useState} from 'react';
import Select from "../components/UI/select/Select";
import img from "../img/icon.svg";
import "../styles/SignUp.css"
import TextInput from "../components/UI/inputs/text_input/TextInput";
import PasswordInput from "../components/UI/inputs/password_input/PasswordInput";
import MajorButton from "../components/UI/buttons/major_button/MajorButton";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [isValidLogin, setIsValidLogin] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidPasswordRepeat, setIsValidPasswordRepeat] = useState(true);
    const [dormNumber, setDormNumber] = useState(-1);

    useEffect(() => {
        setIsValidPasswordRepeat((String(password) === String(passwordRepeat)));
    }, [password, passwordRepeat]);

    useEffect(() => {
        const regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        setIsValidPassword(String(password).match(regExp) !== null || String(password).length === 0);
    }, [password]);

    const checkSignUp = () => {
        if (isValidLogin === true && isValidPassword === true && isValidPasswordRepeat === true ||
            String(passwordRepeat).length === 0) {
            navigate('../login');
            //Запрос на бэкенд
        }
    }


    return (
        <div className={"signup-page"}>
            <div style={{display: "flex", justifyContent: "center", position: "absolute", top: 20, left: 31}}>
                <img style={{width: "80px", height: "auto", margin: "auto"}} src={img}/>
            </div>
            <div className={"signup-panel"}>
            <TextInput
                value={login}
                onChange={e => {setLogin(e.target.value)}}
                valid={isValidLogin}
                style={{marginTop: "30px", fontSize: "20px", borderRadius: "7px"}}
                placeholder={"Введите Логин"}>
            </TextInput>
            <PasswordInput
                value={password}
                onChange={e => {setPassword(e.target.value)}}
                valid={isValidPassword}
                style={{marginTop: "30px", fontSize: "20px", borderRadius: "7px"}}
                placeholder={"Введите пароль"}>
            </PasswordInput>
            <PasswordInput
                value={passwordRepeat}
                onChange={e => {setPasswordRepeat(e.target.value)}}
                valid={isValidPasswordRepeat}
                style={{marginTop: "30px", fontSize: "20px", borderRadius: "7px"}}
                placeholder={"Повторите Пароль"}>
            </PasswordInput>
            <Select options={[{value: "0", name: "Общежитие №6"}]}
                    placeholder={"Общежитие №"}
            ></Select>
            <div style={{marginTop: "10px", display: "flex", justifyContent: "center"}}>
                <MajorButton
                    onClick={() => {checkSignUp()}}
                    style={{marginTop: "30px", height: "60px", width: "180px", borderRadius: "7px", fontSize: "24px"}}>
                    Зарегестрироваться
                </MajorButton>
            </div>
            <label onClick={() => {navigate("../login");}} className={"signup-text-link"}>Войти в аккаунт</label>
            </div>
        </div>
    );
};

export default SignUp;