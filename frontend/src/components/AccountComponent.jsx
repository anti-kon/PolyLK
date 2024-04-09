import React, {useContext, useEffect, useState} from 'react';
import {BiCog, BiSolidDownArrow, BiSolidUpArrow} from "react-icons/bi";
import ContentBox from "./UI/content_boxes/content_box/ContentBox";
import FileComponent from "./UI/files/FileComponent";
import "../styles/Account.css"
import DropFileUpload from "./UI/drag_and_drop/DropFileUpload";
import axios from "axios";
import CircleDotsLoading from "./UI/loaders/CircleDotsLoading";
import {useNavigate} from "react-router-dom";
import {InfoContext} from "../App";
import {encode} from "js-base64";

const AccountComponent = ({person, gearOnClick, ...props}) => {
    const [isResponseValid, setIsResponseValid] = useState(false);
    const [isProcessed, setIsProcessed] = useState(true);
    const [files, setFiles] = useState([]);
    const [isContentVisible, setIsContentVisible] = useState(false);

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

    const loadFiles = () => {
        setIsProcessed(true);
        console.log(isProcessed);
        axios.get('http://212.109.221.176:8080/django-info-person/infoPerson/', {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('access-token')).value}`},
            params: { id_person: person.id_person}
        })
            .then(response => {
                setIsProcessed(false);
                setIsResponseValid(true);
                if(response.status === 200) {
                    setFiles(response.data.docs_list);
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

    useEffect(() => {loadFiles();}, [])

    const sendFile = (files) => {
        let formData = new FormData();
        formData.append('id_person', person.id_person);
        formData.append('name_file', files[0].name.split('.').slice(0, -1).join('.'));
        formData.append('file', files[0]);
        axios.post('http://212.109.221.176:8080/django-info-person/infoPerson/', formData, {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('access-token')).value}`}
        })
            .then(() => loadFiles())
            .catch(err => console.log(err));
    }

    const filePost = (filesArray, limit) => {
        let content = []
        for (let index = 0; index < Math.min(limit, filesArray.length); index++){
            content.push(
                <FileComponent key={filesArray[index].id_doc}
                               url={filesArray[index].path_to_doc}>
                    {filesArray[index].name_doc}
                </FileComponent>
            );
        }
        return content;
    };

    return (
        <div {...props} className={"account"}>
            <div className={"label-block"}>
                <label>{person.login_person}</label>

                <button style={{marginLeft: "auto"}} className={"account-frameless-button"}>
                    <BiCog
                        onClick={gearOnClick}
                        style={{
                            width: "28px",
                            height: "auto",
                            strokeWidth: "0.7px"
                        }}/>
                </button>
            </div>
            <ContentBox style={{padding: "15px", minHeight: "175px"}}>
                <div style={{fontSize: "18px", marginLeft: "0", marginRight: "0"}} className={"label-block"}>
                    <label>Мои файлы</label>
                    <button
                        style={{marginLeft: "auto"}}
                        className={"account-frameless-button"}
                        onClick={() => {setIsContentVisible(!isContentVisible)}}>
                        {isContentVisible ?
                            <BiSolidUpArrow
                                style={{width: "18px", height: "auto",}}
                                onClick={() => {setIsContentVisible(true)}}/> :
                            <BiSolidDownArrow
                                style={{width: "18px", height: "auto",}}
                                onClick={() => {setIsContentVisible(false)}}/>}
                    </button>
                </div>
                <div className={"file-list"}>
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
                                            onClick={() => loadFiles()}>
                                            Попробовать снова
                                        </button>
                                    </div>
                                </div> :
                                isContentVisible ? filePost(files, files.length) : filePost(files, 4)
                    }
                </div>
            </ContentBox>
            <DropFileUpload onLoad={files => sendFile(files)}>
                Перетащите ваши файлы в эту область или кликните для добавления
            </DropFileUpload>
        </div>
    );
};

export default AccountComponent;
