import React from 'react';
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import SwitchBar from "../components/SwitchBar";
import ContentBox from "../components/UI/content_boxes/content_box/ContentBox";
import Appointment from "../components/Appointment";
const UserAppointments = () => {
    const appointments = [
        {id: 1, title: "Запись на ремонт", date: "02.09.2023", body: "Почините что-нибудь"},
        {id: 2, title: "Запись на дезинсекцию", date: "08.10.2077", body: null},
        {id: 3, title: "Запись на стирку", date: null, body: "Машинка № 2 запись с 9:00 до 9:40"}
    ]

    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"appointments-page"}>
                <SwitchBar></SwitchBar>
                <div className={"appointments-section-list"}>
                    <label className={'page-label'}>Мои записи</label>
                    {appointments.map((appointment) =>
                        <ContentBox key={appointment.id} style={{display: "block", margin: "20px"}}>
                            <Appointment title={appointment.title} date={appointment.date}>{appointment.body}</Appointment>
                        </ContentBox>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserAppointments;