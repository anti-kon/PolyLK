import React, {useEffect, useState} from 'react';
import Select from "../components/UI/select/Select";
import img from "../img/icon.svg";
import "../styles/SignUp.css"
import TextInput from "../components/UI/inputs/text_input/TextInput";
import PasswordInput from "../components/UI/inputs/password_input/PasswordInput";
import MajorButton from "../components/UI/buttons/major_button/MajorButton";
import {useNavigate} from "react-router-dom";
import ContentBox from "../components/UI/content_boxes/content_box/ContentBox";

const SignUp = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [isPasswordSelect,setIsPasswordSelect] = useState(false);

    const [isValidLogin, setIsValidLogin] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidPasswordRepeat, setIsValidPasswordRepeat] = useState(true);
    const [dormNumber, setDormNumber] = useState(-1);

    const dorms = [{value: "1", name: "Общежитие №4"}, {value: "2", name: "Общежитие №6"}];

    useEffect(() => {
        setIsValidPasswordRepeat((String(password) === String(passwordRepeat) || passwordRepeat === ''));
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
                    style={{fontSize: "20px", borderRadius: "7px"}}
                    placeholder={"Введите Логин"}>
                </TextInput>
                {!isValidLogin ?
                    <label className={"error-text"}>Пользователь уже существует</label> :
                    <div style={{height: "20px", marginTop: "7px", marginBottom: '7px'}}/>}
                <PasswordInput
                    onSelect={() => setIsPasswordSelect(true)}
                    onBlur={() => setIsPasswordSelect(false)}
                    value={password}
                    onChange={e => {setPassword(e.target.value)}}
                    valid={isValidPassword}
                    style={{fontSize: "20px",
                            borderRadius: "7px",
                            marginBottom: isPasswordSelect ? '7px' : '0',
                            transition: 'margin',
                            transitionDelay: !isPasswordSelect ? '0.75s' : '0.0s'}}
                    placeholder={"Введите пароль"}>
                </PasswordInput>
                {
                    <ContentBox className={`password-tip ${isPasswordSelect ? "password-tip-show" : ""}`}>
                        <div style={{display: 'block', margin: '10px', fontFamily: '"Oswald", sans-serif', fontSize: '12', letterSpacing: '-2', fontWeight: '500', color: '#68a3a3'}}>
                            <label>Требования к паролю<br/></label>
                            <div style={{display: 'flex'}}><div>•</div><label style={{marginLeft:"6px"}}>не менее 8 символов</label></div>
                            <div style={{display: 'flex'}}><div>•</div><label style={{marginLeft:"6px"}}>как минимум одна заглавная и одна строчная буква</label></div>
                            <div style={{display: 'flex'}}><div>•</div><label style={{marginLeft:"6px"}}>как минимум одна цифра</label></div>
                        </div>
                    </ContentBox>
                }
                {!isValidPassword ?
                    <label className={"error-text"}>Ненадёжный пароль</label> :
                    <div style={{height: "20px", marginTop: "7px", marginBottom: "7px"}}/>}
                <PasswordInput
                    value={passwordRepeat}
                    onChange={e => {setPasswordRepeat(e.target.value)}}
                    valid={isValidPasswordRepeat}
                    style={{fontSize: "20px", borderRadius: "7px"}}
                    placeholder={"Повторите Пароль"}>
                </PasswordInput>
                {!isValidPasswordRepeat ?
                    <label className={"error-text"}>Пароли не совпадают</label> :
                    <div style={{height: "20px", marginTop: "7px", marginBottom: "7px"}}/>}
                <Select style={{marginTop: 0}}
                        options={dorms}
                        placeholder={"Общежитие №"}
                ></Select>
                <div style={{marginTop: "10px", display: "flex", justifyContent: "center"}}>
                    <MajorButton
                        onClick={() => {checkSignUp()}}
                        style={{marginTop: "30px",
                                height: "60px",
                                width: "180px",
                                borderRadius: "7px",
                                fontSize: "24px"}}>
                        Зарегестрироваться
                    </MajorButton>
                </div>
                <label onClick={() => {navigate("../login");}} className={"signup-text-link"}>Войти в аккаунт</label>
            </div>
        </div>
    );
};

export default SignUp;