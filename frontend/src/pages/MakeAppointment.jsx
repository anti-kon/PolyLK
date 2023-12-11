import React from 'react';
import { useParams } from 'react-router-dom'
import SwitchBar from "../components/SwitchBar";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import ContentBox from "../components/UI/content_boxes/content_box/ContentBox";
import "../styles/AppointmentsList.css";
import "../styles/MakeAppointment.css"
import { decode } from 'js-base64';
import MajorButton from "../components/UI/buttons/major_button/MajorButton";
import ResizeableTextarea from "../components/UI/textareas/resizeable_textarea/ResizeableTextarea";

const MakeAppointment = () => {
    const { appointmentName } = useParams()

    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"appointments-page"}>
                <SwitchBar></SwitchBar>
                <ContentBox>
                    <div className={'new-appointment-body'}>
                        <div className={'new-appointment-title'}>
                            <label className={"new-appointment-label"}>{decode(appointmentName)}</label>
                        </div>
                        <ResizeableTextarea placeholder={"Введите сюда ваше сообщение..."}></ResizeableTextarea>
                        <MajorButton
                            style={{width: 'max-content',
                                padding: '4px 15px',
                                borderRadius: '5px',
                                margin: '0 0 10px 10px' }}>
                            Отправить
                        </MajorButton>
                    </div>
                </ContentBox>
            </div>
        </div>
    );
};

export default MakeAppointment;