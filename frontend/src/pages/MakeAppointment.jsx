import React, {useLayoutEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import SwitchBar from "../components/SwitchBar";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import ContentBox from "../components/UI/content_boxes/content_box/ContentBox";
import "../styles/AppointmentsList.css";
import "../styles/MakeAppointment.css"
import { decode } from 'js-base64';
import MajorButton from "../components/UI/buttons/major_button/MajorButton";
import ResizeableTextarea from "../components/UI/textareas/resizeable_textarea/ResizeableTextarea";
import MajorFooter from "../components/UI/footers/major_footer/MajorFooter";

const MakeAppointment = () => {
    const { appointmentName } = useParams()
    const [pageWidth, setPageWidth] = useState(0);
    const [appointmentText, setAppointmentText] = useState("")

    useLayoutEffect(() => {
        setPageWidth(window.innerWidth);
        function handleWindowResize() {
            setPageWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"appointments-page"}>
                {pageWidth > 570 && <SwitchBar></SwitchBar> }
                <ContentBox>
                    <div className={'new-appointment-body'}>
                        <div className={'new-appointment-title'}>
                            <label className={"new-appointment-label"}>{decode(appointmentName)}</label>
                        </div>
                        <ResizeableTextarea placeholder={"Введите сюда ваше сообщение..."} onChange={ (e) => setAppointmentText(e.target.value)}></ResizeableTextarea>
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
            {pageWidth <= 570 && <MajorFooter /> }
        </div>
    );
};

export default MakeAppointment;