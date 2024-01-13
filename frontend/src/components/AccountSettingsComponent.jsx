import React, {useContext, useEffect, useState} from 'react';
import TextInput from "./UI/inputs/text_input/TextInput";
import PasswordInput from "./UI/inputs/password_input/PasswordInput";
import MajorButton from "./UI/buttons/major_button/MajorButton";
import ShadowButton from "./UI/buttons/shadow_button/ShadowButton";
import ContentBox from "./UI/content_boxes/content_box/ContentBox";
import Select from "./UI/select/Select";
import axios from "axios";
import CircleDotsLoading from "./UI/loaders/CircleDotsLoading";
import {useNavigate} from "react-router-dom";
import {InfoContext, PersonContext} from "../App";
import {encode} from "js-base64";


const AccountSettingsComponent = ({returnFunc, ...props}) => {
    const navigate = useNavigate();

    const { person, setPerson } = useContext(PersonContext);
    const {setInfoMessage} = useContext(InfoContext);

    const [isProcessed, setIsProcessed] = useState(false);

    const [login, setLogin] = useState(person.login_person);
    const [password, setPassword] = useState(person.password_person);
    const [passwordRepeat, setPasswordRepeat] = useState(person.password_person);
    const [isPasswordSelect,setIsPasswordSelect] = useState(false);
    const [dormNumber, setDormNumber] = useState(person.dorm_num_person);

    const [isValidLogin, setIsValidLogin] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidPasswordRepeat, setIsValidPasswordRepeat] = useState(true);
    const [isDormNumErrorShow, setIsDormNumErrorShow] = useState(false);

    const dorms = [{key: 0, value: 1, name: "Общежитие № 1"},
        {key: 1, value: 3, name: "Общежитие № 3"},
        {key: 2, value: 4, name: "Общежитие № 4"},
        {key: 3, value: 5, name: "Общежитие № 5"},
        {key: 4, value: 6, name: "Общежитие № 6"},
        {key: 5, value: 7, name: "Общежитие № 7"},
        {key: 6, value: 8, name: "Общежитие № 8"},
        {key: 7, value: 10, name: "Общежитие № 10"},
        {key: 8, value: 11, name: "Общежитие № 11"},
        {key: 9, value: 12, name: "Общежитие № 12"},
        {key: 10, value: 13, name: "Общежитие № 13"},
        {key: 11, value: 14, name: "Общежитие № 14"},
        {key: 12, value: 16, name: "Общежитие № 16"},
        {key: 13, value: 17, name: "Общежитие № 17"},
        {key: 14, value: 18, name: "Общежитие № 18"},
        {key: 15, value: 20, name: "Общежитие № 20"}]

    useEffect(() => {
        setIsValidPasswordRepeat((String(password) === String(passwordRepeat) || passwordRepeat === ''));
    }, [password, passwordRepeat]);

    useEffect(() => {
        const regExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])([a-zA-Z\d]{8,50})$/;
        setIsValidPassword(String(password).match(regExp) !== null ||
            (String(password).length === 0) && isValidPassword !== false);
    }, [password]);

    useEffect(() => {
        setIsValidLogin(true);
    }, [login]);

    useEffect(() => {
        setIsDormNumErrorShow(false);
    }, [dormNumber]);

    const updateInfoMessage = (status, message, link, link_title) => {
        setInfoMessage( {
            status: status,
            message: message,
            link: link,
            link_title: link_title
        });

        return encode(new Date().getMilliseconds() + new Date().getDate() + status.length + 523);
    }

    const updatePerson = () => {
        if (login.length === 0)
            setIsValidLogin(false);
        if (password.length === 0)
            setIsValidPassword(false);
        if (dormNumber === 0)
            setIsDormNumErrorShow(true);

        if (isValidLogin === true && isValidPassword === true &&
            isValidPasswordRepeat === true && isDormNumErrorShow !== true &&
            login.length !== 0 && password.length !== 0 && dormNumber !== 0){
            setIsProcessed(true);
            axios.put('http://localhost:8003/infoPerson/', {
                id_person: person.id_person,
                login_person: login,
                password_person: password,
                dorm_num_person: dormNumber
            }).then(response => {
                setIsProcessed(false);
                if(response.status === 200) {
                    setPerson(response.data);
                }
            }).catch(error => {
                setIsProcessed(false);
                if (error.code === "ERR_NETWORK") {
                    navigate("../message/" + updateInfoMessage(
                        "502",
                        "Сервер не отвечает",
                        "../signup",
                        "Вернуться на страницу авторизации"));
                } else if (error.response.status === 404) {
                    navigate("../message/" + updateInfoMessage(
                        "404",
                        "Пользователь не найден",
                        "../login",
                        "Вернуться на страницу авторизации"));
                } else {
                    navigate("../message/" + updateInfoMessage(
                        error.response.status.toString(),
                        error.response.data,
                        "../signup",
                        "Вернуться на страницу авторизации"));
                }
            })
        }
    }

    return (
        <div className={"account-setting"}>
            <TextInput
                style={{
                    height: "48px",
                    fontSize: "20px",
                    color: "#68a3a3"
                }}
                valid={true}
                value={person.login_person}
                onChange={e => console.log(e)}>
            </TextInput>
            {!isValidLogin ?
                <label className={"error-text"}>
                    {login.length === 0? "Неверный логин" : "Пользователь уже существует"}
                </label> :
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
                <ContentBox
                    style={{boxShadow: isValidPassword ?
                            "0 0 7px rgba(0, 106, 105, 0.7)" :
                            "0 0 7px rgb(218, 118, 118)"}}
                    className={`password-tip ${isPasswordSelect ? "password-tip-show" : ""}`}>
                    <div style={{
                        display: 'block',
                        margin: '10px',
                        color: isValidPassword ? "#68a3a3" : "#da7676"}}>
                        <label>Требования к паролю<br/></label>
                        <div style={{display: 'flex'}}><div>•</div><label style={{marginLeft:"6px"}}>не менее 8 и не более 50 символов</label></div>
                        <div style={{display: 'flex'}}><div>•</div><label style={{marginLeft:"6px"}}>как минимум одна заглавная и одна строчная буква</label></div>
                        <div style={{display: 'flex'}}><div>•</div><label style={{marginLeft:"6px"}}>как минимум одна цифра</label></div>
                        <div style={{display: 'flex'}}><div>•</div><label style={{marginLeft:"6px"}}>только цифры и буквы латинского алфавита</label></div>
                    </div>
                </ContentBox>
            }
            {!isValidPassword ?
                <label className={"error-text"}>
                    {password.length < 50 ? "Ненадёжный пароль" : "Слишком длинный пароль"}
                </label> :
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
            <div style={{maxWidth: "370px", overflow: "clip"}}>
                <Select
                    valid={!isDormNumErrorShow}
                    onChange={(e) => {setDormNumber(e.target.value);}}
                    style={{marginTop: 0, borderRadius: "7px", fontSize: "20px", caretColor: "transparent"}}
                    options={dorms}
                    placeholder={"Общежитие №"}
                ></Select>
            </div>
            {isDormNumErrorShow ?
                <label className={"error-text"}>Выберите общежитие</label> :
                <div style={{height: "20px", marginTop: "7px", marginBottom: "7px"}}/>}
            <div className={"button-panel"}>
                <MajorButton
                    onClick={() => {updatePerson()}}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "170px",
                        height: "48px",
                        borderRadius: "7px",
                        fontSize: "20px",
                        margin: "0 auto 0 0",
                    }}>
                    {isProcessed ? <CircleDotsLoading size={"40px"}/> : "Сохранить"}
                </MajorButton>
                <ShadowButton
                    onClick={returnFunc}
                    style={{
                        width: "170px",
                        height: "48px",
                        borderRadius: "7px",
                        fontSize: "20px",
                        margin: "0 0 0 auto",
                        justifyContent: "center"
                    }}>
                    Отмена
                </ShadowButton>
            </div>
        </div>
    );
};

export default AccountSettingsComponent;