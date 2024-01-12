import React from 'react';
import MajorButton from "./UI/buttons/major_button/MajorButton";
import '../styles/UserAppointments.css'

const Appointment = ({title, date, children}) => {
    return (
        <div>
            <div className={"appointment-title"}>
                <label className={"appointment-label"}>{title}</label>
                <label className={"appointment-date"}>{date}</label>
            </div>
            {children != null && <p className={'appointment-body'}>{children}</p>}
            <MajorButton
                style={{width: 'max-content',
                        padding: '4px 15px',
                        borderRadius: '5px',
                        margin: '0 0 10px 10px' }}>
                Отменить
            </MajorButton>
        </div>
    );
};

export default Appointment;