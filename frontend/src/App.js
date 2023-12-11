import React, {useState} from 'react';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import News from "./pages/News";
import BulletinBoard from "./pages/BulletinBoard";
<<<<<<< Updated upstream
import Queue from "./pages/Queue";
=======
import AppointmentsList from "./pages/AppointmentsList";
import MakeAppointment from "./pages/MakeAppointment";
>>>>>>> Stashed changes
import FAQ from "./pages/FAQ";
import UserAppointments from "./pages/UserAppointments";

function App() {
    const [person, setPerson] = useState({id: -1, login: '', password: '', dorNum: -1});

    return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login loginFunc={(person) => {setPerson(person)}} />}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/account" element={
                <Account
                    changePerson={(person) => {setPerson(person)}}
                    person={person}/>}>
            </Route>
            <Route path="/news" element={<News/>}></Route>
            <Route path="/bulletin_board" element={<BulletinBoard/>}></Route>
<<<<<<< Updated upstream
            <Route path="/queue" element={<Queue/>}></Route>
=======
            <Route path="/appointments" element={<AppointmentsList/>}></Route>
            <Route path="/appointments/laundry-appointment"></Route>
            <Route path="/appointments/:appointmentName" element={<MakeAppointment/>}></Route>
            <Route path="/appointments/my-appointments" element={<UserAppointments/>}></Route>
>>>>>>> Stashed changes
            <Route path="/faq" element={<FAQ/>}></Route>
            <Route path="/" element={<Navigate replace to="/login"/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
