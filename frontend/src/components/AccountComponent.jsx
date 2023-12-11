import React, {useState} from 'react';
import {BiCog, BiSolidDownArrow, BiSolidUpArrow} from "react-icons/bi";
import ContentBox from "./UI/content_boxes/content_box/ContentBox";
import FileComponent from "./UI/files/FileComponent";
import "../styles/Account.css"

const AccountComponent = ({person, gearOnClick, ...props}) => {
    const [isContentVisible, setIsContentVisible] = useState(false);

    const files = [{title: "квитация за оплату ноябрь 2021.pdf", url: "https://www.africau.edu/images/default/sample.pdf"},
                   {title: "квитация за оплату октябрь 2021.pdf", url: "https://www.africau.edu/images/default/sample.pdf"},
                   {title: "квитация за оплату сентябрь 2021.pdf", url: "https://www.africau.edu/images/default/sample.pdf"},
                   {title: "квитация за оплату август 2021.pdf", url: "https://www.africau.edu/images/default/sample.pdf"},
                   {title: "квитация за оплату июль 2021.pdf", url: "https://www.africau.edu/images/default/sample.pdf"},
                   {title: "квитация за оплату июнь 2021.pdf", url: "https://www.africau.edu/images/default/sample.pdf"}];

    const filePost = (filesArray, limit) => {
        let content = []
        for (let index = 0; index < limit; index++){
            content.push(
                <FileComponent key={index} url={filesArray[index].url}>{filesArray[index].title}</FileComponent>
            );
        }
        return content;
    };

    return (
        <div {...props} className={"account"}>
            <div className={"label-block"}>
                <label>{person.login}</label>

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
            <ContentBox style={{padding: "15px"}}>
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
                    {isContentVisible ? filePost(files, files.length) : filePost(files, 4)}
                </div>
            </ContentBox>
            <div className={"drag-and-drop-block"}>
                Перетащите ваши файлы в эту область или кликните для добавления
            </div>
        </div>
    );
};

export default AccountComponent;