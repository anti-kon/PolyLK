import React, {useLayoutEffect, useState} from 'react';
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import SwitchBar from "../components/SwitchBar";
import ContentBox from "../components/UI/content_boxes/content_box/ContentBox";
import Appointment from "../components/Appointment";
import MajorFooter from "../components/UI/footers/major_footer/MajorFooter";
const UserAppointments = () => {
    const appointments = [
        {id: 1, title: "Запись на ремонт", date: "02.09.2023", body: "Почините что-нибудь"},
        {id: 2, title: "Запись на дезинсекцию", date: "08.10.2077", body: null},
        {id: 3, title: "Запись на стирку", date: null, body: "Машинка № 2 запись с 9:00 до 9:40"}
    ]
    const [pageWidth, setPageWidth] = useState(0);
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
                <div className={"appointments-section-list"} style={pageWidth > 570 ? {} : {margin: "0 10px 0 auto"}}>
                    <label className={'page-label'}>Мои записи</label>
                    {appointments.map((appointment) =>
                        <ContentBox key={appointment.id} style={{display: "block", margin: "20px", width: "auto", maxWidth: "100%"}}>
                            <Appointment title={appointment.title} date={appointment.date}>{appointment.body}</Appointment>
                        </ContentBox>
                    )}
                </div>
            </div>
            {pageWidth <= 570 && <MajorFooter /> }
        </div>
    );
};

export default UserAppointments;