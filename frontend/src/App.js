import React, {useState} from 'react';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import News from "./pages/News";
import BulletinBoard from "./pages/BulletinBoard";
import AppointmentsList from "./pages/AppointmentsList";
import MakeAppointment from "./pages/MakeAppointment";
import FAQ from "./pages/FAQ";
import UserAppointments from "./pages/UserAppointments";
import LaundryAppointment from "./pages/LaundryAppointment";
import ServicePage from "./pages/ServicePage";

export const PersonContext = React.createContext(null);
export const InfoContext = React.createContext(null);

function App() {
    const [person, setPerson] = useState({id: -1, login: '', password: '', dorNum: -1});
    const [infoMessage, setInfoMessage] = useState(
        {
            status: "",
            message: "",
            link: "",
            link_title: ""
        }
    );

    return (
        <BrowserRouter>
            <InfoContext.Provider value={{infoMessage: infoMessage,
                setInfoMessage: data => setInfoMessage(data)}}>
                <PersonContext.Provider value={{person: person,
                    setPerson: data => setPerson(data)}}>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/account" element={<Account/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/bulletin_board" element={<BulletinBoard/>}/>
                        <Route path="/appointments" element={<AppointmentsList/>}/>
                        <Route path="/appointments/laundry-appointment" element={<LaundryAppointment/>}/>
                        <Route path="/appointments/:appointmentName" element={<MakeAppointment/>}/>
                        <Route path="/appointments/my-appointments" element={<UserAppointments/>}/>
                        <Route path="/faq" element={<FAQ/>}/>
                        <Route path="/message/:token" element={<ServicePage/>}/>
                        <Route path="/" element={<Navigate replace to="/login"/>}/>
                    </Routes>
                </PersonContext.Provider>
            </InfoContext.Provider>
        </BrowserRouter>
  );
}

export default App;
